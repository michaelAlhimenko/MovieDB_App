import React, { Component } from 'react'

import Services from '../../services/services.js'
import MovieItem from '../MovieItem/MovieItem.jsx'

import './index.css'

export default class MovieList extends Component {
  constructor() {
    super()
    this.state = {
      data: [],
    }
    this.services = new Services()
  }
  async componentDidMount() {
    const data = await this.services.getListFilms('return')
    const { results } = data
    this.updateState(results)
  }
  updateState = (info) => {
    this.setState(() => {
      return {
        data: info,
      }
    })
  }
  render() {
    let { data } = this.state
    let items = undefined

    if (data) {
      items = data.map((item) => <MovieItem key={item.id} data={item} />)
    }

    return <ul className="movie-list">{items}</ul>
  }
}
