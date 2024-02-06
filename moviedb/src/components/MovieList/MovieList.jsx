import React, { Component } from 'react'
import { Spin, Alert } from 'antd'

import Services from '../../services/services.js'
import MovieItem from '../MovieItem/MovieItem.jsx'

import './index.css'

export default class MovieList extends Component {
  constructor() {
    super()
    this.state = {
      data: [],
      loading: true,
      error: false,
    }
    this.movieService = new Services()
    this.onMovieLoad()
  }
  onError = () => {
    this.setState({
      error: true,
      loading: false,
    })
  }
  onMovieLoad = async () => {
    try {
      const data = await this.movieService.getListFilms('return')
      const { results } = data
      this.updateState(results)
    } catch (error) {
      this.onError()
    }
  }
  updateState = (info) => {
    this.setState({
      data: info,
      loading: false,
    })
  }

  render() {
    let { data, loading, error } = this.state

    const hasData = !(loading || error)

    const errorMessage = error ? <Alert type="error" message="Couldn't upload" showIcon /> : null
    const spiner = loading ? <Spin size="large" /> : null
    const content = hasData ? MovieView(data) : null

    return (
      <ul className={error ? '' : 'movie-list'}>
        {errorMessage}
        {spiner}
        {content}
      </ul>
    )
  }
}

const MovieView = (data) => {
  return data.map((item) => <MovieItem key={item.id} data={item} />)
}
