import { useState } from "react"
import API from "../utils/api"
import { useNavigate, Link } from "react-router-dom"

function Register() {
  const [form, setForm] = useState({ name: "", email: "", password: "", bio: "" })
  const navigate = useNavigate()

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value })
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    try {
      await API.post("/auth/register", form)
      alert("Registration successful")
      navigate("/login")
    } catch (err) {
      alert(err.response?.data?.message || "Error")
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 px-4">
      <div className="w-full max-w-md bg-white shadow-md rounded-lg p-8">
        <h2 className="text-2xl font-bold text-center mb-6">Create an Account</h2>

        <form onSubmit={handleSubmit} className="space-y-4">
          <input
            className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
            name="name"
            placeholder="Full Name"
            onChange={handleChange}
            required
          />
          <input
            className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
            type="email"
            name="email"
            placeholder="Email"
            onChange={handleChange}
            required
          />
          <input
            className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
            name="bio"
            placeholder="Bio (optional)"
            onChange={handleChange}
          />
          <input
            className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
            type="password"
            name="password"
            placeholder="Password"
            onChange={handleChange}
            required
          />
          <button
            type="submit"
            className="w-full bg-indigo-600 text-white py-3 rounded-lg hover:bg-indigo-700 transition"
          >
            Register
          </button>
        </form>

        <p className="text-sm text-gray-600 mt-4 text-center">
          Already have an account?{" "}
          <Link to="/login" className="text-indigo-600 hover:underline">
            Login
          </Link>
        </p>
      </div>
    </div>
  )
}

export default Register
