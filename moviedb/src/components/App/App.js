import React, { Component } from 'react'

import MovieList from '../MovieList/MovieList.jsx'

import './App.css'
export default class App extends Component {
  render() {
    return (
      <section className="app">
        <MovieList />
      </section>
    )
  }
}
