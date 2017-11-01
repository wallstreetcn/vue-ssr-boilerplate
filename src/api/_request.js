import { API_BASE } from 'src/config'

async function _fetch(url, opts) {
  const res = await fetch(API_BASE + url, opts)
  if (!res.ok) throw res

  const body = await res.json()

  if (body.code === 20000) {
    return body.data
  } else {
    throw body
  }
}

export default {
  get(url, query) {
    if (query) {
      url = new URL(url)
      for (const name in query) {
        if (query[name] != null) url.searchParams.append(name, query[name])
      }
      url = url.toString()
    }

    return _fetch(url)
  },

  post(url, body) {
    return _fetch(url, {
      method: 'POST',
      body: JSON.stringify(body)
    })
  }
}
