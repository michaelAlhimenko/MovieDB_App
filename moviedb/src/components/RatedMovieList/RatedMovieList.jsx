import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { Spin, Alert, Pagination } from 'antd'

import Services from '../../services/services.js'
import MovieItem from '../MovieItem/MovieItem.jsx'

export default class RatedMovieList extends Component {
  static defaultProps = {
    guestSessionId: '',
  }
  static propTypes = {
    guestSessionId: PropTypes.string,
  }
  constructor() {
    super()
    this.state = {
      data: [],
      loading: true,
      error: false,
      page: 1,
      errorLoad: '',
    }
    this.totalMovie = 0
  }
  componentDidMount() {
    this.movieService = new Services()
    this.onMovieLoad(this.props.guestSessionId, this.state.page)
  }

  componentDidUpdate(prevProp, prevState) {
    if (prevState.page !== this.state.page) {
      this.onMovieLoad(this.props.guestSessionId, this.state.page)
    }
  }

  onMovieLoad = async (sessionId, page) => {
    try {
      let data = await this.movieService.getRatedMovies(sessionId, page)
      const { results, total_results } = data
      if (results.length === 0) {
        this.setState({
          errorLoad: 'Вы не оценивали фильмы',
          loading: false,
          data: [],
        })
      } else {
        this.updateState(results, total_results)
      }
    } catch (error) {
      this.onError()
    }
  }

  onError = () => {
    this.setState({
      error: true,
      loading: false,
    })
  }

  updateState = (results, total_results) => {
    this.totalMovie = total_results
    this.setState({
      error: false,
      data: results,
      loading: false,
      errorLoad: '',
    })
  }

  onChangePage = (e) => {
    this.setState({
      page: e,
      loading: true,
    })
  }

  render() {
    let { data, loading, error, page, errorLoad } = this.state
    const { guestSessionId } = this.props
    const hasData = !(loading || error || errorLoad)
    const errorMess = error ? <Alert type="error" message="Вы не оценивали фильмы" showIcon /> : null
    const spiner = loading ? <Spin size="large" /> : null
    const errorLoading = errorLoad.length ? <Alert type="error" message={errorLoad} showIcon /> : null

    const content = hasData
      ? data.map((item) => <MovieItem key={item.id} data={item} guestSessionId={guestSessionId} />)
      : null

    const pagination =
      hasData && data.length > 0 ? (
        <Pagination
          className="movies-list__pagination"
          showSizeChanger={false}
          pageSize={20}
          current={page}
          defaultCurrent={1}
          total={this.totalMovie}
          onChange={(e) => this.onChangePage(e)}
        ></Pagination>
      ) : null

    return (
      <section className="movies-list">
        <div className="movies-list__wrapper">
          {spiner}
          <ul className={!hasData ? '' : 'movies-list__ul'}>{content}</ul>
          {errorMess}
          {errorLoading}
          {pagination}
        </div>
      </section>
    )
  }
}
