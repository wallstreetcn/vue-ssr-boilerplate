import request from './_request'

export function getItem(id) {
  return request.get('item/' + id)
}

export async function getTopStories() {
  const stories = await request.get('topstories.json')
  return stories.map(id => getItem(id))
}
