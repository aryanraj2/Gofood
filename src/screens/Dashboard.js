import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import Navbar from '../components/Navbar'

export default function Dashboard() {
  const [userData, setUserData] = useState({})
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')
  const navigate = useNavigate()

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const token = localStorage.getItem('token')
        
        if (!token) {
          navigate('/login')
          return
        }

        const response = await fetch("http://localhost:5001/api/auth/getuser", {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'auth-token': token
          }
        })

        if (!response.ok) {
          throw new Error('Failed to fetch user data')
        }

        const data = await response.json()
        setUserData(data)
        setLoading(false)
      } catch (err) {
        console.error('Error fetching user data:', err)
        setError(err.message)
        setLoading(false)
        localStorage.removeItem('token')
        localStorage.removeItem('userEmail')
        navigate('/login')
      }
    }

    fetchUserData()
  }, [navigate])

  if (loading) {
    return (
      <div>
        <Navbar />
        <div className='container mt-5'>
          <div className="text-center">
            <div className="spinner-border text-primary" role="status">
              <span className="visually-hidden">Loading...</span>
            </div>
          </div>
        </div>
      </div>
    )
  }

  if (error) {
    return (
      <div>
        <Navbar />
        <div className='container mt-5'>
          <div className="alert alert-danger" role="alert">
            Error: {error}
          </div>
        </div>
      </div>
    )
  }

  return (
    <div>
      <Navbar />
      <div className='container mt-5 mb-5'>
        <div className='row'>
          <div className='col-md-6 mx-auto'>
            <div className='card bg-dark border-success'>
              <div className='card-header bg-success'>
                <h3 className='card-title text-dark mb-0'>User Profile</h3>
              </div>
              <div className='card-body'>
                <div className='mb-3'>
                  <label className='text-info fw-bold'>Name:</label>
                  <p className='text-white'>{userData.name}</p>
                </div>
                <div className='mb-3'>
                  <label className='text-info fw-bold'>Email:</label>
                  <p className='text-white'>{userData.email}</p>
                </div>
                {/* Location removed from profile */}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
