async function rateMovie(rate, movieId, guestSessionId) {
  const basicURL = `https://api.themoviedb.org/3/movie/${movieId}/rating?api_key=c3d345e4c272d321ca279411b8ea1fdc&guest_session_id=${guestSessionId}&value=${rate}`
  const res = await fetch(basicURL, {
    method: 'POST',
    headers: {
      accept: 'application/json',
      'Content-Type': 'application/json;charset=utf-8',
    },
  })
  if (!res.ok) {
    throw new Error('Could not fetch')
  }

  const data = await res.json()

  return data
}
export default rateMovie
