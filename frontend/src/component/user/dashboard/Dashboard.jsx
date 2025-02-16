import React, { useState } from 'react';
import GuideProfile from './dashboardcomponents/guideProfile';
import ProfileUpdate from './dashboardcomponents/Profileupdate';
import Request from './dashboardcomponents/Request';



const Dashboard = () => {
  const [activeComponent, setActiveComponent] = useState('Profile');

  return (
    <div className="min-h-screen flex">
      <link
        rel="stylesheet"
        href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.0.0-beta2/css/all.min.css"
      />
      
      {/* Sidebar */}
      <div className="sticky top-0 bg-white h-screen p-4 border-r border-gray-200 w-64 flex-shrink-0">
        {/* Items */}
        <div className="space-y-4">
          {/* Profile */}
          <button
            onClick={() => setActiveComponent('Profile')}
            aria-label="profile"
            className="w-full text-left relative px-4 py-3 flex items-center space-x-4 rounded-lg text-white bg-orange-500"
          >
            <i className="fas fa-home text-white" />
            <span className="-mr-1 font-medium">Profile</span>
          </button>

          <button
            onClick={() => setActiveComponent('Request')}
            className="w-full text-left px-4 py-3 flex items-center space-x-4 rounded-md text-gray-500 group"
          >
            <i className="fas fa-exchange-alt" />
            <span>Request</span>
          </button>
          <button
            onClick={() => setActiveComponent('Account')}
            className="w-full text-left px-4 py-3 flex items-center space-x-4 rounded-md text-gray-500 group"
          >
            <i className="fas fa-user" />
            <span>Account</span>
          </button>
          <button
            onClick={() => setActiveComponent('Logout')}
            className="w-full text-left px-4 py-3 flex items-center space-x-4 rounded-md text-gray-500 group"
          >
            <i className="fas fa-sign-out-alt" />
            <span>Logout</span>
          </button>
        </div>
      </div>

      {/* Main Content */}
      <div className="flex-grow bg-gray-100 p-6 overflow-auto">
        {activeComponent === 'Profile' && <GuideProfile/>}
        {activeComponent === 'Request' && <Request/>}
        {activeComponent === 'Account' && <ProfileUpdate/>}
        {activeComponent === 'Logout' && <div>Logout Content</div>}
      </div>
    </div>
  );
};

export default Dashboard;
