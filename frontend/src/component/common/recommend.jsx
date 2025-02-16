import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useLocation, useNavigate } from 'react-router-dom';
import './GuideRecommendation.css';

export default function GuideRecommendation() {
  const [recommendedGuides, setRecommendedGuides] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const location = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    const fetchGuides = async () => {
      const query = new URLSearchParams(location.search);
      const loc = query.get('location');

      if (!loc) return;

      setLoading(true);
      setError(null);

      try {
        const response = await axios.get(`http://localhost:3000/api/v1/users/recommend?location=${loc}`);
        setRecommendedGuides(response.data);
      } catch (error) {
        console.error('Error fetching recommended guides:', error);
        setError(error.response ? error.response.data.error : 'Error fetching guides. Please try again.');
      } finally {
        setLoading(false);
      }
    };

    fetchGuides();
  }, [location]);

  const handleViewProfile = (id) => {
    navigate(`/profile/${id}`);
  };

  return (
    <div className="max-w-6xl mx-auto mt-16 bg-white shadow-xl rounded-lg text-gray-900">
      <div className="text-center py-8">
        <h2 className="font-display text-3xl tracking-tight text-indigo-500 sm:text-4xl">
          Find your local tour guide with MeroSathi
        </h2>
        <p className="text-lg text-orange-500 mt-2">Choose your best</p>
      </div>
      {loading && <p className="text-center">Loading...</p>}
      {error && <p className="text-center text-red-500">{error}</p>}
      
      {!loading && !error && (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8 p-4">
          {recommendedGuides.map(guide => (
            <div key={guide._id} className="bg-white shadow-md rounded-lg overflow-hidden">
              <div 
                className="relative h-48 bg-cover bg-center" 
                style={{ backgroundImage: `url(http://localhost:3000/${guide.coverImage})` }}
              >
                <img 
                  src={`http://localhost:3000/${guide.profilePicture}`} 
                  alt={guide.name} 
                  className="absolute bottom-0 left-0 w-24 h-24 rounded-full border-4 border-white -mb-12 ml-4"
                />
              </div>
              <div className="p-4 mt-12 text-center">
                <h4 className="font-semibold text-lg">{guide.name}</h4>
                <p className="text-gray-500">{guide.quote}</p>
              </div>
              <ul className="py-4 mt-2 text-gray-700 flex items-center justify-around text-sm">
                <li className="flex flex-col items-center justify-around">
                  <svg
                    className="w-4 fill-current text-blue-900"
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 20 20"
                  >
                    <path d="M10 15l-5.878 3.09 1.123-6.545L.489 6.91l6.572-.955L10 0l2.939 5.955 6.572.955-4.756 4.635 1.123 6.545z" />
                  </svg>
                  <div className="font-bold">{guide.experience} years of experience</div>
                </li>
                <li className="flex flex-col items-center justify-around">
                  <svg
                    className="w-4 fill-current text-blue-900"
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 20 20"
                  >
                    <path d="M7 8a4 4 0 1 1 0-8 4 4 0 0 1 0 8zm0 1c2.15 0 4.2.4 6.1 1.09L12 16h-1.25L10 20H4l-.75-4H2L.9 10.09A17.93 17.93 0 0 1 7 9zm8.31.17c1.32.18 2.59.48 3.8.92L18 16h-1.25L16 20h-3.96l.37-2h1.25l1.65-8.83zM13 0a4 4 0 1 1-1.33 7.76 5.96 5.96 0 0 0 0-7.52C12.1.1 12.53 0 13 0z" />
                  </svg>
                  <div className="font-bold">{guide.location}</div>
                </li>
              </ul>
              <div className="text-center pb-4">
                <button 
                  className="mt-4 px-6 py-2 bg-orange-500 text-white rounded-lg hover:bg-orange-600 w-3/4 mx-auto"
                  onClick={() => handleViewProfile(guide.userId)}
                >
                  View Profile
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
