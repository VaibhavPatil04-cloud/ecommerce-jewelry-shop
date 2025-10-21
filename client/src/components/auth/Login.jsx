import React, { useState } from 'react'
import { Link, useNavigate, useLocation } from 'react-router-dom'
import { useAuth } from '../../context/AuthContext'

const Login = () => {
  const [formData, setFormData] = useState({
    email: '',
    password: '',
  })
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)
  const { login } = useAuth()
  const navigate = useNavigate()
  const location = useLocation()

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    })
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    setError('')
    setLoading(true)

    const result = await login(formData)
    
    if (result.success) {
      // Redirect to the page they tried to access or home
      const from = location.state?.from || '/'
      
      // If admin, redirect to admin panel
      if (result.user?.role === 'admin') {
        navigate('/admin')
      } else {
        navigate(from)
      }
    } else {
      setError(result.message)
    }
    
    setLoading(false)
  }

  const handleAdminQuickLogin = async () => {
    setError('')
    setLoading(true)
    
    const result = await login({
      email: 'vaibhav@gmail.com',
      password: '123456'
    })
    
    if (result.success) {
      navigate('/admin')
    } else {
      setError(result.message)
    }
    
    setLoading(false)
  }

  return (
    <div className="min-h-screen flex items-center justify-center px-4 py-12">
      <div className="max-w-md w-full">
        <div className="bg-dark-card border border-dark-border rounded-lg p-8">
          <div className="text-center mb-8">
            <h2 className="text-3xl font-bold text-gold mb-2">Welcome Back</h2>
            <p className="text-gray-400">Login to your Patil Jewellers account</p>
          </div>

          {error && (
            <div className="bg-red-500/10 border border-red-500 text-red-500 rounded-lg p-3 mb-6 text-sm">
              {error}
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <label className="block text-sm font-medium mb-2">Email Address</label>
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                required
                className="w-full bg-dark-elevated border border-dark-border rounded-lg px-4 py-3 focus:outline-none focus:border-gold"
                placeholder="your@email.com"
              />
            </div>

            <div>
              <label className="block text-sm font-medium mb-2">Password</label>
              <input
                type="password"
                name="password"
                value={formData.password}
                onChange={handleChange}
                required
                className="w-full bg-dark-elevated border border-dark-border rounded-lg px-4 py-3 focus:outline-none focus:border-gold"
                placeholder="Enter your password"
              />
            </div>

            <div className="flex items-center justify-between text-sm">
              <label className="flex items-center gap-2 cursor-pointer">
                <input type="checkbox" className="w-4 h-4" />
                <span className="text-gray-400">Remember me</span>
              </label>
              <a href="#" className="text-gold hover:underline">Forgot password?</a>
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full bg-gold hover:bg-gold-dark text-dark-bg font-medium py-3 rounded-lg transition-colors disabled:opacity-50"
            >
              {loading ? 'Logging in...' : 'Login'}
            </button>

            {/* Admin Demo Info */}
            <div className="mt-4 p-4 bg-dark-elevated border border-dark-border rounded-lg">
              <p className="text-xs text-gray-400 text-center mb-3">
                <span className="font-semibold text-gold">Admin Demo Credentials:</span>
              </p>
              <div className="text-xs text-gray-400 space-y-1 mb-3">
                <p>Email: <span className="text-white">vaibhav@gmail.com</span></p>
                <p>Password: <span className="text-white">123456</span></p>
              </div>
              <button
                type="button"
                onClick={handleAdminQuickLogin}
                disabled={loading}
                className="w-full bg-blue-600 hover:bg-blue-700 text-white text-sm py-2 rounded transition-colors disabled:opacity-50"
              >
                Quick Login as Admin
              </button>
            </div>
          </form>

          <p className="text-center mt-6 text-sm text-gray-400">
            Don't have an account?{' '}
            <Link to="/register" className="text-gold hover:underline font-medium">
              Register here
            </Link>
          </p>
        </div>
      </div>
    </div>
  )
}

export default Login