import { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import API from '../utils/api'

function Profile() {
  const { id } = useParams()
  const [user, setUser] = useState(null)
  const [posts, setPosts] = useState([])

  const fetchProfile = async () => {
    try {
      const res = await API.get(`/users/${id}`)
      setUser(res.data.user)
      setPosts(res.data.posts)
    } catch (err) {
      console.error(err)
      alert('Failed to load profile')
    }
  }

  useEffect(() => {
    fetchProfile()
  }, [id])

  if (!user) return <p>Loading...</p>

  return (
    <div style={{ padding: '1rem' }}>
      <h2>{user.name}'s Profile</h2>
      <p><strong>Email:</strong> {user.email}</p>
      <p><strong>Bio:</strong> {user.bio || 'No bio available'}</p>

      <h3>Posts</h3>
      {posts.length === 0 ? (
        <p>No posts yet.</p>
      ) : (
        posts.map((post) => (
          <div key={post._id} style={{ borderBottom: '1px solid #ddd', padding: '0.5rem 0' }}>
            <p>{post.content}</p>
            <small>{new Date(post.createdAt).toLocaleString()}</small>
          </div>
        ))
      )}
    </div>
  )
}

export default Profile
