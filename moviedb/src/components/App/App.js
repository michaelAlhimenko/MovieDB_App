import React, { Component } from 'react'

import MovieList from '../MovieList/MovieList.jsx'

import './App.css'
// new Services().getListFilms('return').then((res) => res.results.forEach((element) => console.log(element)))
export default class App extends Component {
  // constructor() {
  //   super()
  //   this.state = {
  //     data: {},
  //   }
  //   this.services = new Services()
  // }
  // async componentDidMount() {
  //   const data = await this.services.getListFilms('return')
  //   const { results } = data
  //   this.updateState(results)
  // }
  // updateState = (info) => {
  //   this.setState(() => {
  //     return {
  //       data: info,
  //     }
  //   })
  // }

  render() {
    return (
      <section className="app">
        <MovieList />
      </section>
    )
  }
}
