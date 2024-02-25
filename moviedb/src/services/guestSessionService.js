async function createGuestSession() {
  const basicURL =
    'https://api.themoviedb.org/3/authentication/guest_session/new?api_key=c3d345e4c272d321ca279411b8ea1fdc'
  const res = await fetch(basicURL, {
    method: 'GET',
    headers: {
      accept: 'application/json',
    },
  })

  if (!res.ok) {
    throw new Error('Could not fetch')
  }

  const data = await res.json()

  return data
}
export default createGuestSession
