import React, { Component } from 'react'
import { Tabs } from 'antd'

import { ServiceProvider } from '../../services/service-context.js'
import MovieList from '../MovieList/MovieList.jsx'
import RatedMovieList from '../RatedMovieList/RatedMovieList.jsx'
import guestSessionService from '../../services/guestSessionService.js'
import Services from '../../services/services.js'

import './App.css'
export default class App extends Component {
  constructor() {
    super()
    this.state = {
      guestSessionId: null,
      page: 1,
      ratedFilms: [],
      genre: null,
      nameFilm: '',
    }
  }
  componentDidMount() {
    this.guestSession = guestSessionService
    this.getRated = new Services()
    this.getRated.getGenreOfMovie().then((res) => this.setState({ genre: res.genres }))
    this.guestSession().then((res) => this.setState({ guestSessionId: res.guest_session_id }))
  }
  items = [
    {
      key: 1,
      label: 'Search',
    },
    {
      key: 2,
      label: 'Rate',
    },
  ]
  onTogglePage = (e) => {
    this.setState({
      page: e,
    })
  }
  onNameFilm = (name) => {
    this.setState({
      nameFilm: name,
    })
  }
  render() {
    const { page, guestSessionId } = this.state
    const list =
      page === 1 ? (
        <MovieList
          onNameFilm={this.onNameFilm}
          nameFilm={this.state.nameFilm}
          guestSessionId={guestSessionId}
          genre={this.state.genre}
        />
      ) : (
        <RatedMovieList guestSessionId={guestSessionId} page={this.state.page} genre={this.state.genre} />
      )

    return (
      <section className="app">
        <Tabs
          className="custom-tab"
          defaultActiveKey="1"
          items={this.items}
          onChange={(e) => this.onTogglePage(e)}
          animated={true}
          centered={true}
          size="large"
        />
        <ServiceProvider value={this.state.genre}>{list}</ServiceProvider>
      </section>
    )
  }
}
