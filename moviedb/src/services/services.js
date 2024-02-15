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
      throw new Error('Could not fetch')
    }
    return await res.json()
  }
  async getListFilmsByNameAndPage(name, page) {
    const res = await this.getResource(name, page)
    return res
  }
}
