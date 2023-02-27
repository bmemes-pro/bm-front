import axios from 'axios'

export const fetchPost = async ({ postId }) => {
  const { data } = await axios.get(`/api/post/${postId}`)
  return data
}

export const fetchInfo = async (args) => {
  const { data } = await axios.post('/api/info', args ?? {})
  return data
}

export const fetchPosts = async ({ count, mode, offset }) => {
  const params = {
    count,
    mode,
    offset
  }
  const { data: { list, count: postsCount } } = await axios.get('/api/posts', { params })

  return {
    posts: list,
    count: postsCount
  }
}

export const fetchUsers = async ({ count, mode }) => {
  const params = {
    count,
    orderBy: mode === 'rich' ? 'awards_amount' : 'created_at',
    orderDirection: mode === 'rich' ? 'DESC' : 'ASC'
  }
  const { data: users } = await axios.get('/api/users', { params })

  return {
    users
  }
}

export const fetchUser = async ({ id }) => {
  const { data: user } = await axios.get(`/api/user/${id}`)

  user.posts.forEach(post => {
    post.user = { ...user, posts: undefined }
  })

  return {
    user
  }
}
