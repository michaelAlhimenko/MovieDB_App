import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { Card, Typography, Tag, Rate, Progress } from 'antd'
import { format } from 'date-fns'

import { ServiceConsumer } from '../../services/service-context.js'
import rateMovieService from '../../services/rateMovieService.js'

const { Title, Paragraph } = Typography

import './index.css'

export default class MovieItem extends Component {
  static defaultProps = {
    guestSessionId: '',
    title: 'Film',
    id: 23534,
    overview: '',
    release_date: '',
    poster_path: '',
    vote_average: 10,
  }
  static propTypes = {
    guestSessionId: PropTypes.string,
    title: PropTypes.string,
    id: PropTypes.number,
    overview: PropTypes.string,
    release_date: PropTypes.string,
    poster_path: PropTypes.string,
    vote_average: PropTypes.number,
  }
  componentDidMount() {
    this.toRate = rateMovieService
  }
  shortenText(text, maxLength) {
    if (text.length <= maxLength) {
      return text
    }

    let shortened = text.slice(0, maxLength)
    let lastSpaceIndex = shortened.lastIndexOf(' ')

    if (lastSpaceIndex !== -1) {
      shortened = shortened.slice(0, lastSpaceIndex)
    }

    return shortened + '...'
  }
  voteColor(rating) {
    let color
    if (rating < 3) {
      color = '#E90000'
    } else if (rating < 5) {
      color = '#E97E00'
    } else if (rating < 7) {
      color = '#E9D100'
    } else {
      color = '#66E900'
    }
    return color
  }
  rate = (num, id) => {
    const { guestSessionId } = this.props
    this.props.onRatedFilms(num, id)
    this.toRate(num, id, guestSessionId)
  }
  tagsGenre() {
    const { genre_ids } = this.props.data
    return (
      <ServiceConsumer>
        {(genre) => {
          return genre.map((item) => {
            return genre_ids.includes(item.id) ? (
              <Tag key={item.id} className="movie-item-tag">
                {item.name}
              </Tag>
            ) : null
          })
        }}
      </ServiceConsumer>
    )
  }

  render() {
    const { title, id, overview, release_date, poster_path, vote_average, rating } = this.props.data
    const { ratedFilms } = this.props

    const croppedOverview = this.shortenText(overview, 230)
    const croppedTitle = this.shortenText(title, 22)
    let date = undefined

    if (release_date) {
      const newTime = new Date(release_date)
      date = format(newTime, 'MMMM d, yyyy')
    }

    const ratingOfMovie = () => {
      const rate = ratedFilms.find((e) => id === e.id)
      if (rating) {
        return <Rate disabled={false} value={rating} count={10} onChange={(e) => this.rate(e, id)}></Rate>
      } else if (rate) {
        return <Rate disabled={false} value={rate.rate} count={10} onChange={(e) => this.rate(e, id)}></Rate>
      }
      return <Rate count={10} onChange={(e) => this.rate(e, id)}></Rate>
    }

    let imageURL = `https://image.tmdb.org/t/p/w300${poster_path}`

    if (!poster_path) {
      imageURL = 'https://www.flaticon.com/ru/free-icons/-'
    }

    return (
      <li key={id}>
        <Card
          hoverable
          loading={!this.props.data ? true : false}
          bordered={false}
          className="movie-item-card"
          cover={<img className="movie-item__image--desctop" style={{ borderRadius: 0 }} src={imageURL} />}
        >
          <div className="movie-item__header--mobile">
            <img className="movie-item__image--mobile" style={{ borderRadius: 0 }} src={imageURL} />
            <div className="movie-item__wrapper--mobile">
              <div className="movie-item__header">
                <Title className="movie-item-title" level={5}>
                  {croppedTitle}
                </Title>
                <Progress
                  type="circle"
                  percent={vote_average.toFixed(1) * 10}
                  format={() => vote_average.toFixed(1)}
                  strokeColor={this.voteColor(vote_average)}
                  size={33}
                />
              </div>
              <Paragraph className="movie-item-data">{date}</Paragraph>
              {this.tagsGenre()}
            </div>
          </div>
          <Paragraph className="movie-item-overview">{croppedOverview}</Paragraph>
          {ratingOfMovie()}
        </Card>
      </li>
    )
  }
}
