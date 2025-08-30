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
    <div className="max-w-2xl mx-auto p-6">
      <h2 className="text-2xl font-bold mb-4 text-gray-800">Public Feed</h2>

      {isLoggedIn && (
        <form
          onSubmit={handleCreatePost}
          className="bg-white shadow-md rounded-lg p-4 mb-6"
        >
          <textarea
            placeholder="Write a post..."
            value={newPost}
            onChange={(e) => setNewPost(e.target.value)}
            required
            className="w-full border rounded-lg p-3 mb-3 focus:ring-2 focus:ring-indigo-500 outline-none"
          />
          <button
            type="submit"
            className="bg-indigo-600 text-white px-4 py-2 rounded-lg hover:bg-indigo-700 transition"
          >
            Post
          </button>
        </form>
      )}

      <div className="space-y-4">
        {posts.length === 0 ? (
          <p className="text-gray-500 text-center">No posts yet.</p>
        ) : (
          posts.map((post) => (
            <div
              key={post._id}
              className="bg-white shadow-md rounded-lg p-4"
            >
              <p className="text-gray-800">{post.content}</p>
              <small className="text-gray-500 block mt-2">
                By: {post.author?.name || 'Unknown'} —{' '}
                {new Date(post.createdAt).toLocaleString()}
              </small>
            </div>
          ))
        )}
      </div>
    </div>
  )
}

export default Home
