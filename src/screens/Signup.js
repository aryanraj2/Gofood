import React, { useState } from 'react'
import { useNavigate, Link } from 'react-router-dom'
import Navbar from '../components/Navbar';
export default function Signup() {
  const [credentials, setCredentials] = useState({ name: "", email: "", password: "" })
  const [showPassword, setShowPassword] = useState(false)
  const [errors, setErrors] = useState({ name: "", email: "", password: "" })
  let navigate = useNavigate()

  // Location/geo helper removed — schema no longer stores location

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    // Validation
    let newErrors = { name: "", email: "", password: "" };
    
    newErrors.name = validateField("name", credentials.name);
    newErrors.email = validateField("email", credentials.email);
    newErrors.password = validateField("password", credentials.password);
    
    setErrors(newErrors);
    
    // If there are errors, don't proceed
    if (newErrors.name || newErrors.email || newErrors.password) {
      return;
    }
    
  const response = await fetch("http://localhost:5001/api/auth/createuser", {
      // credentials: 'include',
      // Origin:"http://localhost:3000/login",
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ name: credentials.name, email: credentials.email, password: credentials.password })

    });
    const json = await response.json()
    console.log(json);
    if (json.success) {
      //save the auth toke to local storage and redirect
      localStorage.setItem('token', json.authToken)
      navigate("/login")

    }
    else {
      alert("Enter Valid Credentials")
    }
  }

  const onChange = (e) => {
    setCredentials({ ...credentials, [e.target.name]: e.target.value })
  }

  const validateField = (fieldName, value) => {
    let error = "";
    
    if (fieldName === "name") {
      if (!value.trim()) {
        error = "Name is required";
      }
    } else if (fieldName === "email") {
      if (!value.trim()) {
        error = "Email is required";
      } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value)) {
        error = "Please enter a valid email";
      }
    } else if (fieldName === "password") {
      if (!value.trim()) {
        error = "Password is required";
      } else if (value.length < 5) {
        error = "Password must be at least 5 characters";
      }
    }
    
    return error;
  }

  const handleBlur = (e) => {
    const { name, value } = e.target;
    const error = validateField(name, value);
    setErrors({ ...errors, [name]: error });
  }

  return (
    <div>
      <div>
      <Navbar />
      </div>

        <div className='container' >
          <form className='w-50 m-auto mt-5 border bg-dark border-success rounded' onSubmit={handleSubmit}>
            <div className="m-3">
              <label htmlFor="name" className="form-label">Name</label>
              <input 
                type="text" 
                className={`form-control ${errors.name ? 'is-invalid' : ''}`} 
                name='name' 
                value={credentials.name} 
                onChange={onChange}
                onBlur={handleBlur}
                aria-describedby="emailHelp" 
              />
              {errors.name && <div className="invalid-feedback" style={{display: 'block'}}>{errors.name}</div>}
            </div>
            <div className="m-3">
              <label htmlFor="email" className="form-label">Email address</label>
              <input 
                type="email" 
                className={`form-control ${errors.email ? 'is-invalid' : ''}`} 
                name='email' 
                value={credentials.email} 
                onChange={onChange}
                onBlur={handleBlur}
                aria-describedby="emailHelp" 
              />
              {errors.email && <div className="invalid-feedback" style={{display: 'block'}}>{errors.email}</div>}
            </div>
            <div className="m-3">
              <label htmlFor="exampleInputPassword1" className="form-label">Password</label>
              <div className={`input-group ${errors.password ? 'mb-1' : ''}`}>
                <input 
                  type={showPassword ? "text" : "password"} 
                  className={`form-control ${errors.password ? 'is-invalid' : ''}`} 
                  value={credentials.password} 
                  onChange={onChange}
                  onBlur={handleBlur}
                  name='password' 
                />
                <button 
                  type="button" 
                  className={`btn btn-outline-secondary ${errors.password ? 'is-invalid' : ''}`}
                  onClick={() => setShowPassword(!showPassword)}
                  tabIndex="-1"
                >
                  <i className={`bi ${showPassword ? 'bi-eye-slash' : 'bi-eye'}`} style={{fontSize: '1.2rem'}}>
                    {showPassword ? '👁️‍🗨️' : '👁️'}
                  </i>
                </button>
              </div>
              {errors.password && <div className="invalid-feedback" style={{display: 'block'}}>{errors.password}</div>}
            </div>
            <button type="submit" className="m-3 btn btn-success">Submit</button>
            <Link to="/login" className="m-3 mx-1 btn btn-danger">Already a user</Link>
          </form>
        </div>
      </div>
  )
}