/* eslint-disable prettier/prettier */
import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { Spin, Alert, Pagination, Input } from 'antd'
import { debounce } from 'lodash'

import Services from '../../services/services.js'
import MovieItem from '../MovieItem/MovieItem.jsx'

import './index.css'

export default class MovieList extends Component {
  static defaultProps = {
    guestSessionId: '',
    nameFilm: '',
  }
  static propTypes = {
    guestSessionId: PropTypes.string,
    nameFilm: PropTypes.string,
  }
  constructor() {
    super()
    this.state = {
      data: [],
      loading: false,
      error: false,
      page: 1,
      name: '',
      errorLoad: '',
    }
    this.totalMovie = 0
  }
  componentDidMount() {
    this.setState({
      page: this.props.currentPage,
      name: this.props.nameFilm,
    })
    this.movieService = new Services()
    this.search = debounce((name, page) => this.onMovieLoad(name, page), 500)
  }

  componentDidUpdate(prevProp, prevState) {
    if (prevState.page !== this.state.page) {
      this.search(this.state.name, this.state.page)
    }
    if (prevState.name !== this.state.name) {
      this.search(this.state.name, this.state.page)
      this.props.onCurrentPage(1)
      if ( this.props.currentPage === 1) {
        this.setState({
          page: 1,
        })
      }
    }
  }
  componentWillUnmount() {
    this.props.onNameFilm(this.state.name)
    this.props.onCurrentPage(this.state.page)
  }
  onMovieLoad = async (name, page) => {
    try {
      if (name.length === 0) {
        this.setState({
          errorLoad: '',
          loading: false,
          data: [],
        })
      } else {
        let data = await this.movieService.getListFilmsByNameAndPage(name, page)

        const { results, total_results } = data
        if (results.length === 0) {
          this.setState({
            errorLoad: 'Не найдено фильмов по вашему запросу',
            loading: false,
            data: [],
          })
        } else {
          this.updateState(results, total_results)
        }
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

  updateState = (name, total_results) => {
    this.totalMovie = total_results
    this.setState({
      error: false,
      data: name,
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

  onSearchMovie = (e) => {
    this.setState({
      name: e.target.value,
      loading: true,
    })
  }

  render() {
    let { data, loading, error, page, errorLoad } = this.state

    const { guestSessionId, onRatedFilms, ratedFilms } = this.props
    const hasData = !(loading || error || errorLoad)
    const errorMess = error ? <Alert type="error" message="Couldn't upload" showIcon /> : null
    const spiner = loading ? <Spin className="movie-list__spiner" size="large" /> : null
    const errorLoading = errorLoad.length ? <Alert type="error" message={errorLoad} showIcon /> : null

    const content = hasData
      ? data.map((item) => <MovieItem key={item.id} data={item} guestSessionId={guestSessionId} ratedFilms={ratedFilms} onRatedFilms={onRatedFilms}/>)
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
          <Input
            className="movies-list__input"
            value={this.state.name}
            placeholder="Введите название фильма"
            onChange={(e) => this.onSearchMovie(e)}
          ></Input>
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
