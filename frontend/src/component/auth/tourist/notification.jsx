import React, { useState, useEffect } from 'react';
import axios from 'axios';
import io from 'socket.io-client';

const NotificationPage = () => {
  const [notifications, setNotifications] = useState([]);
  const touristId = localStorage.getItem('touristId'); // Assuming touristId is stored in localStorage

  useEffect(() => {
    // Fetch notifications from the server
    const fetchNotifications = async () => {
      try {
        const response = await axios.get(`http://localhost:3000/api/v1/notifications/${touristId}`);
        setNotifications(response.data);
      } catch (error) {
        console.error('Error fetching notifications:', error);
      }
    };

    fetchNotifications();

    const socket = io('http://localhost:3000', {
      query: { touristId },
    });

    socket.on('connect', () => {
      console.log('Connected to WebSocket');
    });

    socket.on('disconnect', () => {
      console.log('Disconnected from WebSocket');
    });

    socket.on('notification', (data) => {
      console.log('Received notification:', data);
      setNotifications(prevNotifications => [...prevNotifications, {
        event: 'notification',
        message: data.message,
      }]);
    });

    return () => {
      console.log('Disconnecting WebSocket...');
      socket.disconnect();
    };
  }, [touristId]);

  return (
    <div className="min-h-screen bg-gray-100 p-6">
      <h1 className="text-2xl font-bold mb-4">Notifications</h1>
      <div className="bg-white border border-gray-200 p-4 rounded-lg shadow-sm">
        {notifications.length === 0 ? (
          <p className="text-sm text-gray-500">No notifications yet.</p>
        ) : (
          <ul className="divide-y divide-gray-200">
            {notifications.map((notification, index) => (
              <li key={index} className="py-2">
                <p className="text-sm"><strong>{notification.event}:</strong> {notification.message}</p>
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
};

export default NotificationPage;
