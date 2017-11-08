import request from './_request'

export function getAnimeList(query) {
  return request.get('/anime', query)
}
