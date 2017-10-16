const BASE = 'https://www.example.com'

async function _fetch(url, init) {
  const res = await fetch(url, init)
  if (!res.ok) throw res

  const body = await res.json()
  if (body.code === 20000) return body.data
  else throw body
}

export default {
  get(url, query) {
    url = BASE + url

    if (query) {
      url = new URL(url)
      for (const name in query) {
        if (query[name] != null) url.searchParams.append(name, query[name])
      }
      url = url.toString()
    }

    return _fetch(url, {
      method: 'GET'
    })
  },

  post(url, body) {
    return _fetch(BASE + url, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(body)
    })
  }
}
