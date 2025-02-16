import React, { useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import axios from 'axios';

const Profile = () => {
  const guideId=localStorage.getItem('guideId') // Get guideId from the URL
  const [profile, setProfile] = useState(null);

  useEffect(() => {
    
    
    const fetchProfile = async () => {
      try {
        const response = await axios.get(`http://localhost:3000/api/v1/profile/guide/${guideId}`); // Fetch profile based on guideId
        setProfile(response.data);
      } catch (error) {
        console.error('Error fetching profile:', error);
      }
    };

    fetchProfile();
  }, [guideId]);

  if (!profile) {
    return <div>Loading...</div>;
  }

  return (
    <div className="container mx-auto p-4">
      <div className="relative">
        <img
          src={`http://localhost:3000/${profile.coverImage}`}
          alt="Cover"
          className="w-full h-60 object-cover"
        />
        <div className="absolute top-2/3 left-10 transform -translate-y-1/2 flex items-center z-10">
          <img
            src={`http://localhost:3000/${profile.profilePicture}`}
            alt="Profile"
            className="w-24 h-24 md:w-32 md:h-32 rounded-full border-4 border-white"
          />
        </div>
        <div className="mt-15 ml-60 text-black">
          <h1 className="text-3xl ml-10 font-bold">{profile.name}</h1>
          <p className="mt-1 ml-10 text-gray-700">{profile.location}</p>
          <p className="mt-1 ml-10 text-gray-700">{profile.quote}</p>
        </div>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-7 mt-6">
        <div className="md:col-span-2 p-4">
          <h2 className="text-gray-700 text-2xl font-bold mb-2">About Me</h2>
          <p className="text-gray-500">{profile.aboutMe}</p>
          <h2 className="text-gray-700 text-2xl font-bold mb-2">Experience</h2>
          <p className="text-gray-500">{profile.experience}</p>
          <h2 className="text-gray-700 text-2xl font-bold mb-2">Languages</h2>
          <p className="text-gray-500">{profile.languages.join(', ')}</p>
          <h2 className="text-gray-700 text-2xl font-bold mb-2">Activities</h2>
          <p className="text-gray-500">{profile.activities.join(', ')}</p>
        </div>
       
      </div>
    </div>
  );
};

export default Profile;
