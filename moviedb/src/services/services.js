export default class Services {
  async getResource(name) {
    const res = await fetch(
      `https://api.themoviedb.org/3/search/movie?query=${name}&include_adult=false&language=en-US&page=1&api_key=c3d345e4c272d321ca279411b8ea1fdc`,
      {
        method: 'GET',
        headers: {
          Accept: 'application/json',
        },
      }
    )
    if (!res.ok) {
      throw new Error('Could not fetch')
    }
    return await res.json()
  }

  async getListFilms(name) {
    const res = await this.getResource(name)
    return res
  }
}
