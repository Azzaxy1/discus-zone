import toast from 'react-hot-toast'

const BASE_URL = 'https://forum-api.dicoding.dev/v1'

function getAccessToken () {
  return localStorage.getItem('accessToken')
}

function putAccessToken (accessToken) {
  return localStorage.setItem('accessToken', accessToken)
}

async function fetchWithToken (url, options = {}) {
  return fetch(url, {
    ...options,
    headers: {
      ...options.headers,
      Authorization: `Bearer ${getAccessToken()}`
    }
  })
}

async function login ({ email, password }) {
  const response = await fetch(`${BASE_URL}/login`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({ email, password })
  })

  const responseJson = await response.json()

  const { status, message } = responseJson

  if (status !== 'success') {
    throw new Error(message)
  }

  const {
    data: { token }
  } = responseJson

  return token
}

async function register ({ name, email, password }) {
  const response = await fetch(`${BASE_URL}/register`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({ name, email, password })
  })

  const responseJson = await response.json()

  if (responseJson.status !== 'success') {
    toast.error(responseJson.message)
    return { error: true }
  }

  return { error: false }
}

async function getAllUsers () {
  const response = await fetchWithToken(`${BASE_URL}/users`)
  const responseJson = await response.json()

  const { status, message } = responseJson
  if (status !== 'success') {
    throw new Error(message)
  }

  const {
    data: { users }
  } = responseJson

  return users
}

async function getUserLogged () {
  const response = await fetchWithToken(`${BASE_URL}/users/me`)
  const responseJson = await response.json()

  const { status, message } = responseJson

  if (status !== 'success') {
    throw new Error(message)
  }

  const {
    data: { user }
  } = responseJson

  return user
}

async function createThread ({ title, category, body }) {
  if (!title || !category || !body) {
    return { error: true, message: 'Terdapat data yang kosong.' }
  }

  const response = await fetchWithToken(`${BASE_URL}/threads`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({ title, category, body })
  })

  const responseJson = await response.json()

  if (responseJson.status !== 'success') {
    return { error: true, data: null }
  }

  return { error: false, data: responseJson.data }
}

async function getAllThreads () {
  const response = await fetchWithToken(`${BASE_URL}/threads`)
  const responseJson = await response.json()

  const { status, message } = responseJson
  if (status !== 'success') {
    throw new Error(message)
  }

  const {
    data: { threads }
  } = responseJson

  return threads
}

async function getDetailThread (id) {
  const response = await fetchWithToken(`${BASE_URL}/threads/${id}`)
  const responseJson = await response.json()

  if (responseJson.status !== 'success') {
    return { error: true, data: null }
  }

  return { error: false, data: responseJson.data }
}

async function createComment ({ id, content }) {
  const response = await fetchWithToken(`${BASE_URL}/threads/${id}/comments`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({ content })
  })

  const responseJson = await response.json()

  if (responseJson.status !== 'success') {
    return { error: true, data: null }
  }

  return { error: false, data: responseJson.data }
}

async function upVoteThread (threadId) {
  const response = await fetchWithToken(
    `${BASE_URL}/threads/${threadId}/up-vote`,
    {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      }
    }
  )

  const responseJson = await response.json()

  if (responseJson.status !== 'success') {
    return { error: true, data: null }
  }

  return { error: false, data: responseJson.data }
}

async function downVoteThread (threadId) {
  const response = await fetchWithToken(
    `${BASE_URL}/threads/${threadId}/down-vote`,
    {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      }
    }
  )

  const responseJson = await response.json()

  if (responseJson.status !== 'success') {
    return { error: true, data: null }
  }

  return { error: false, data: responseJson.data }
}

async function upVoteComment (threadId, commentId) {
  const response = await fetchWithToken(
    `${BASE_URL}/threads/${threadId}/comments/${commentId}/up-vote`,
    {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      }
    }
  )

  const responseJson = await response.json()

  if (responseJson.status !== 'success') {
    return { error: true, data: null }
  }

  return { error: false, data: responseJson.data }
}

async function downVoteComment (threadId, commentId) {
  const response = await fetchWithToken(
    `${BASE_URL}/threads/${threadId}/comments/${commentId}/down-vote`,
    {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      }
    }
  )

  const responseJson = await response.json()

  if (responseJson.status !== 'success') {
    return { error: true, data: null }
  }

  return { error: false, data: responseJson.data }
}

async function getLeaderboards () {
  const response = await fetchWithToken(`${BASE_URL}/leaderboards`)
  const responseJson = await response.json()

  const { status, message } = responseJson

  if (status !== 'success') {
    throw new Error(message)
  }

  const {
    data: { leaderboards }
  } = responseJson

  return leaderboards
}

export {
  getAccessToken,
  putAccessToken,
  login,
  register,
  getAllUsers,
  getUserLogged,
  createThread,
  getAllThreads,
  getDetailThread,
  createComment,
  upVoteThread,
  downVoteThread,
  upVoteComment,
  downVoteComment,
  getLeaderboards
}
