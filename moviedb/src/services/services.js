export default class Services {
  async getResource(name, page) {
    const basicURL = `https://api.themoviedb.org/3/search/movie?query=${name}&include_adult=false&language=en-US&page=${page}&api_key=c3d345e4c272d321ca279411b8ea1fdc`
    const res = await fetch(basicURL, {
      method: 'GET',
      headers: {
        Accept: 'application/json',
      },
    })
    if (!res.ok) {
      throw new Error('Не удалось выполнить запрос')
    }
    return await res.json()
  }
  async getListFilmsByNameAndPage(name, page) {
    const res = await this.getResource(name, page)
    return res
  }
  async getRatedMovies(guestSessionId, page) {
    const URL = `https://api.themoviedb.org/3/guest_session/${guestSessionId}/rated/movies?api_key=c3d345e4c272d321ca279411b8ea1fdc&language=en-US&page=${page}&sort_by=created_at.asc`
    const res = await fetch(URL, {
      method: 'GET',
      headers: {
        Accept: 'application/json',
      },
    })

    if (!res.ok) {
      throw new Error('Не удалось получить список оцененных фильмов')
    }

    const data = await res.json()
    return data
  }
  async getGenreOfMovie() {
    const URL = 'https://api.themoviedb.org/3/genre/movie/list?api_key=c3d345e4c272d321ca279411b8ea1fdc&language=en-US'
    const res = await fetch(URL, {
      merhod: 'GET',
      headers: {
        Accept: 'application/json',
      },
    })

    if (!res.ok) {
      throw new Error('Не удалось выполнить запрос')
    }
    const data = await res.json()
    return data
  }
}
