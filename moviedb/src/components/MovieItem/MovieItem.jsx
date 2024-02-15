import React, { Component } from 'react'
import { Card, Typography, Tag, Rate } from 'antd'
import { format } from 'date-fns'

const { Title, Paragraph } = Typography

import './index.css'

export default class MovieItem extends Component {
  constructor() {
    super()
    this.state = {
      image: null,
    }
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

  render() {
    const { title, id, overview, release_date, poster_path } = this.props.data
    const croppedOverview = this.shortenText(overview, 200)
    const croppedTitle = this.shortenText(title, 40)
    let date = undefined
    let newTime = undefined

    if (release_date) {
      newTime = new Date(release_date)
      date = format(newTime, 'MMMM d, yyyy')
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
          cover={<img style={{ borderRadius: 0 }} src={imageURL} />}
        >
          <Title className="movie-item-title" level={5}>
            {croppedTitle}
          </Title>
          <Paragraph className="movie-item-data">{date}</Paragraph>
          <Tag className="movie-item-tag">Action</Tag> <Tag className="movie-item-tag">Drama</Tag>
          <Paragraph className="movie-item-overview">{croppedOverview}</Paragraph>
          <Rate count={10}></Rate>
        </Card>
      </li>
    )
  }
}
