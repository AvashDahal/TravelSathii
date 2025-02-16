import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { FaUser, FaTachometerAlt, FaBell } from 'react-icons/fa';
import logo from '../../assets/logo.png';

export const Navbar = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [isLoggedInUser, setIsLoggedInUser] = useState(!!localStorage.getItem('userId'));
  const [isLoggedInTourist, setIsLoggedInTourist] = useState(!!localStorage.getItem('touristId'));
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  const navigate = useNavigate();

  useEffect(() => {
    const handleStorageChange = () => {
      setIsLoggedInUser(!!localStorage.getItem('guideId'));
      setIsLoggedInTourist(!!localStorage.getItem('touristId'));
    };

    window.addEventListener('storage', handleStorageChange);

    return () => {
      window.removeEventListener('storage', handleStorageChange);
    };
  }, []);

  const handleSearch = () => {
    // Handle the search functionality
    console.log(searchTerm);
    // Redirect or perform search
  };

  const handleLogout = () => {
    // Clear specific localStorage items
    
    localStorage.removeItem('touristId');
    localStorage.removeItem('guideId');
    localStorage.removeItem('accessToken');
    localStorage.removeItem('role');
    localStorage.removeItem('userId');
    setIsLoggedInUser(false);
    setIsLoggedInTourist(false);
    navigate('/');
  };

  const toggleDropdown = () => {
    setIsDropdownOpen(!isDropdownOpen);
  };

  return (
    <nav className="bg-white border-gray-200 dark:bg-gray-900">
      <div className="max-w-screen-xl flex items-center justify-between mx-auto p-4">
        <Link to={'/'} className="flex items-center" style={{ height: '100px' }}>
          <img src={logo} alt="TravelSathi Logo" style={{ width: '200px', height: '200px' }} />
        </Link>
        <div className="flex items-center space-x-7 md:order-2">
          <a href="#" className="block py-2 px-3 text-gray-900 rounded hover:bg-gray-100 md:hover:bg-transparent md:hover:text-red-500 md:dark:hover:text-red-500 dark:text-white dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent dark:border-gray-700">Blog</a>
          <a href="#" className="block py-2 px-3 text-gray-900 rounded hover:bg-gray-100 md:hover:bg-transparent md:hover:text-red-500 md:dark:hover:text-red-500 dark:text-white dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent dark:border-gray-700">About Us</a>
          {(isLoggedInUser || isLoggedInTourist) ? (
            <>
              {isLoggedInUser && (
                <>
                  <div className="relative">
                    <button onClick={toggleDropdown} className="flex items-center text-orange-500 dark:text-white">
                      <FaUser size={25} />
                    </button>
                    {isDropdownOpen && (
                      <div className="absolute right-0 mt-2 w-48 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-md shadow-lg">
                        <Link to={'/dashboard'} className="block px-4 py-2 text-gray-900 dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700">
                          Dashboard
                        </Link>
                        <button onClick={handleLogout} className="block w-full text-left px-4 py-2 text-gray-900 dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700">
                          Logout
                        </button>
                      </div>
                    )}
                  </div>
                </>
              )}
              {isLoggedInTourist && (
                <>
                  <Link to={'/notification'} className="block py-2 px-3 text-gray-900 rounded hover:bg-gray-100 md:hover:bg-transparent md:hover:text-red-500 md:dark:hover:text-red-500 dark:text-white dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent dark:border-gray-700">
                    <FaBell size={20} />
                  </Link>
                  <button onClick={handleLogout} className="text-white bg-orange-500 font-medium rounded-lg text-sm px-4 py-2 text-center">
                    Logout
                  </button>
                </>
              )}
            </>
          ) : (
            <>
              <Link to={'/touristregister'}>
                <button type="button" className="text-white bg-orange-500 font-medium rounded-lg text-sm px-4 py-2 text-center">
                  Signup as Tourist
                </button>
              </Link>
              <Link to={'/guideregister'}>
                <button type="button" className="text-white bg-orange-500 font-medium rounded-lg text-sm px-4 py-2 text-center">
                  Signup as Guide
                </button>
              </Link>
            </>
          )}
          <div className="relative">
            <input 
              type="text" 
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              placeholder="Search by location"
              className="py-2 px-3 text-gray-900 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            />
            <button 
              type="button" 
              onClick={handleSearch}
              className="absolute right-0 top-0 mt-2 mr-2 text-gray-600"
            >
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" className="w-5 h-5">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-4.35-4.35M10.5 18a7.5 7.5 0 1 0 0-15 7.5 7.5 0 0 0 0 15z" />
              </svg>
            </button>
          </div>
          <button data-collapse-toggle="navbar-cta" type="button" className="inline-flex items-center p-2 w-10 h-10 justify-center text-sm text-gray-500 rounded-lg md:hidden hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200 dark:text-gray-400 dark:hover:bg-gray-700 dark:focus:ring-gray-600" aria-controls="navbar-cta" aria-expanded="false">
            <span className="sr-only">Open main menu</span>
            <svg className="w-5 h-5" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 17 14">
              <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M1 1h15M1 7h15M1 13h15" />
            </svg>
          </button>
        </div>
      </div>
    </nav>
  );
};