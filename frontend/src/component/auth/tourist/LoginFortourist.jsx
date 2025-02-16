import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';

const LoginFortourist = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    email: '',
    password: ''
  });
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post('http://localhost:3000/api/v1/tourist/login', formData);
      if (response.status === 200) {
        const { _id, accessToken } = response.data;
        localStorage.setItem('accessToken', 'accessToken');
        localStorage.setItem('role', 'tourist');
        localStorage.setItem('touristId', _id);
        // Trigger a state update in Navbar by setting a dummy state
        window.dispatchEvent(new Event('storage'));
        // Redirect to the homepage
        navigate('/');
      } else {
        setError('Invalid login attempt');
      }
    } catch (error) {
      setError(error.response ? error.response.data.message : 'Server error');
    }
  };

  return (
    <div className="py-16">
      <div className="flex bg-white rounded-lg shadow-lg overflow-hidden mx-auto max-w-sm lg:max-w-4xl">
        <div
          className="hidden lg:block lg:w-1/2 bg-cover"
          style={{
            backgroundImage: 'url("https://assets-api.kathmandupost.com/thumb.php?src=https://assets-cdn.kathmandupost.com/uploads/source/news/2019/miscellaneous/Tourism-Revenue-Nepal-26052019090743.JPG&w=900&height=601")',
            backgroundSize: 'cover', 
            backgroundPosition: 'center' 
          }}
        ></div>
        <div className="w-full p-8 lg:w-1/2">
          <h2 className="text-2xl font-semibold text-gray-700 text-center">
            Welcome Back!!
          </h2>
          <p className="text-gray-600 text-center">Login as Tourist</p>
          <form onSubmit={handleSubmit}>
            <div className="mt-4">
              <label className="block text-gray-700 text-sm font-bold mb-2">
                Email Address
              </label>
              <input
                className="bg-gray-200 text-gray-700 focus:outline-none focus:shadow-outline border border-gray-300 rounded py-2 px-4 block w-full appearance-none"
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
              />
            </div>
            <div className="mt-4">
              <div className="flex justify-between">
                <label className="block text-gray-700 text-sm font-bold mb-2">
                  Password
                </label>
              </div>
              <input
                className="bg-gray-200 text-gray-700 focus:outline-none focus:shadow-outline border border-gray-300 rounded py-2 px-4 block w-full appearance-none"
                type="password"
                name="password"
                value={formData.password}
                onChange={handleChange}
              />
            </div>
            <div className="mt-8">
              <button className="bg-orange-500 text-white font-bold py-2 px-4 w-full rounded hover:bg-orange-600" type="submit">
                Login
              </button>
            </div>
          </form>
          {error && <div className="mt-4 text-red-500 text-center">{error}</div>}
          {success && <div className="mt-4 text-green-500 text-center">{success}</div>}
          <div className="mt-4 flex items-center justify-between">
            <p className="w-1/5 md:w-1/4" />
            Don't have an account?
            <span className="w-1/5 md:w-1/4" />
          </div>
          <div className="mt-4 flex items-center justify-between">
            <span className="border-b w-1/5 md:w-1/4 text-xl" />
            <Link to={'/touristregister'} className="text-xs text-gray-500 uppercase">
              Register here
            </Link>
            <span className="border-b w-1/5 md:w-1/4" />
          </div>
        </div>
      </div>
    </div>
  );
};

export default LoginFortourist;
