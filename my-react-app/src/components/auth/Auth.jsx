import React, { useState } from 'react';
import './Auth.css';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const Auth = () => {
  const [isSignup, setIsSignup] = useState(false); // toggle view
  const [loginData, setLoginData] = useState({ username: '', password: '' });
  const [signupData, setSignupData] = useState({ username: '', password: '' });
  const navigate = useNavigate();

  const handleLoginChange = (e) => {
    setLoginData(prev => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSignupChange = (e) => {
    setSignupData(prev => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleLoginSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post('http://localhost:8080/login', loginData);
      console.log('Login successful:', response.data);
      // Save username
      localStorage.setItem("username", loginData.username);
      navigate('/homepage');
    } catch (error) {
      alert('🚨 Login failed: ' + (error.response?.data || 'Server error'));
    }
  };

  const handleSignupSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post('http://localhost:8080/signup', signupData);
      console.log('Signup successful:', response.data);
      // Save username
      localStorage.setItem("username", signupData.username);
      alert('✅ Signup successful!');
      navigate('/homepage');
    } catch (error) {
      alert('🚨 Signup failed: ' + (error.response?.data || 'Server error'));
    }
  };

  return (
    <div className="auth-wrapper">
      <div className="auth-box">
        {isSignup ? (
          <>
            <h2>Sign Up</h2>
            <form onSubmit={handleSignupSubmit}>
              <input
                type="text"
                name="username"
                placeholder="Username"
                value={signupData.username}
                onChange={handleSignupChange}
                required
              />
              <input
                type="password"
                name="password"
                placeholder="Password"
                value={signupData.password}
                onChange={handleSignupChange}
                required
              />
              <button type="submit">Sign Up</button>
            </form>
            <p className="para2" style={{ marginTop: '10px' }}>
              Already have an account?{' '}
              <button className="link-button" onClick={() => setIsSignup(false)}>Back to Login</button>
            </p>
          </>
        ) : (
          <>
            <h2>Login</h2>
            <form onSubmit={handleLoginSubmit}>
              <input
                type="text"
                name="username"
                placeholder="Username"
                value={loginData.username}
                onChange={handleLoginChange}
                required
              />
              <input
                type="password"
                name="password"
                placeholder="Password"
                value={loginData.password}
                onChange={handleLoginChange}
                required
              />
              <button type="submit">Login</button>
            </form>
            <p className="para1" style={{ marginTop: '10px' }}>
              Don't have an account?{' '}
              <button className="link-button" onClick={() => setIsSignup(true)}>Sign Up</button>
            </p>
          </>
        )}
      </div>
    </div>
  );
};

export default Auth;
