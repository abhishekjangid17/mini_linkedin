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

  if (!user) return <p className="text-center text-gray-500 mt-10">Loading...</p>

  return (
    <div className="max-w-2xl mx-auto p-6">
      <div className="bg-white shadow-md rounded-lg p-6 mb-6">
        <h2 className="text-2xl font-bold mb-2">{user.name}'s Profile</h2>
        <p className="text-gray-600"><strong>Email:</strong> {user.email}</p>
        <p className="text-gray-600"><strong>Bio:</strong> {user.bio || 'No bio available'}</p>
      </div>

      <h3 className="text-xl font-semibold mb-4">Posts</h3>
      {posts.length === 0 ? (
        <p className="text-gray-500 text-center">No posts yet.</p>
      ) : (
        <div className="space-y-4">
          {posts.map((post) => (
            <div key={post._id} className="bg-white shadow-md rounded-lg p-4">
              <p className="text-gray-800">{post.content}</p>
              <small className="text-gray-500 block mt-2">
                {new Date(post.createdAt).toLocaleString()}
              </small>
            </div>
          ))}
        </div>
      )}
    </div>
  )
}

export default Profile
