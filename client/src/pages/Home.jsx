import { useEffect, useState } from 'react'
import API from '../utils/api'
import { useNavigate } from 'react-router-dom'

function Home() {
  const [posts, setPosts] = useState([])
  const [newPost, setNewPost] = useState('')
  const navigate = useNavigate()

  const isLoggedIn = !!localStorage.getItem('token')

  const fetchPosts = async () => {
    try {
      const res = await API.get('/posts')
      setPosts(res.data)
    } catch (err) {
      console.error(err)
    }
  }

  const handleCreatePost = async (e) => {
    e.preventDefault()
    if (!isLoggedIn) return navigate('/login')

    try {
      await API.post('/posts', { content: newPost })
      setNewPost('')
      fetchPosts()
    } catch (err) {
      alert(err.response?.data?.message || 'Failed to post')
    }
  }

  useEffect(() => {
    fetchPosts()
  }, [])

  return (
    <div style={{ padding: '1rem' }}>
      <h2>Public Feed</h2>

      {isLoggedIn && (
        <form onSubmit={handleCreatePost}>
          <textarea
            placeholder="Write a post..."
            value={newPost}
            onChange={(e) => setNewPost(e.target.value)}
            required
            style={{ width: '100%', height: '60px' }}
          />
          <button type="submit">Post</button>
        </form>
      )}

      <div style={{ marginTop: '2rem' }}>
        {posts.length === 0 ? (
          <p>No posts yet.</p>
        ) : (
          posts.map((post) => (
            <div key={post._id} style={{ borderBottom: '1px solid #ddd', padding: '0.5rem 0' }}>
              <p>{post.content}</p>
              <small>By: {post.author?.name || 'Unknown'} — {new Date(post.createdAt).toLocaleString()}</small>
            </div>
          ))
        )}
      </div>
    </div>
  )
}

export default Home
