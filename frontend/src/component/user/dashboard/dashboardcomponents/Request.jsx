import React, { useEffect, useState } from 'react';
import axios from 'axios';
import io from 'socket.io-client';

const Request = () => {
  const [orders, setOrders] = useState([]);
  const [selectedTrip, setSelectedTrip] = useState(null);
  const [error, setError] = useState(null);
  const guideId = localStorage.getItem('guideId');
  const socket = io('http://localhost:3000'); // Connect to socket server

  useEffect(() => {
    // Fetch data from API
    const fetchTrips = async () => {
      try {
        const response = await axios.get(`http://localhost:3000/api/v1/trip/get/${guideId}`, {
          headers: {
            Authorization: `Bearer ${guideId}`,
          },
          withCredentials: true,
        });
        setOrders(response.data);
        console.log('Fetched trips:', response.data);
      } catch (error) {
        console.error('Error fetching data:', error);
        setError('Failed to fetch trips. Please try again.');
      }
    };

    if (guideId) {
      fetchTrips();
    }

    // Listen for socket events
    socket.on('notification', (data) => {
      console.log('Notification received:', data);
      // Handle notification (e.g., update UI or show message)
    });

    // Clean up socket connection
    return () => {
      socket.disconnect();
    };
  }, [guideId]);

  const handleViewDetails = async (tripId) => {
    try {
      const response = await axios.get(`http://localhost:3000/api/v1/trip/${tripId}`, {
        headers: {
          Authorization: `Bearer ${guideId}`,
        },
        withCredentials: true,
      });
      setSelectedTrip(response.data);
      console.log('Fetched trip details:', response.data);
    } catch (error) {
      console.error('Error fetching trip details:', error);
      setError('Failed to fetch trip details. Please try again.');
    }
  };

  const handleAccept = async (tripId) => {
    try {
      // Perform accept logic here
      console.log('Trip accepted:', tripId);

      // Emit notification to server
      socket.emit('sendNotification', {
        touristId: selectedTrip.touristId,
        message: `Tourist ${selectedTrip.touristId} trip accepted`,
      });

      // Update UI: Remove accepted trip from orders
      setOrders(orders.filter(trip => trip._id !== tripId));
      setSelectedTrip(null); // Clear selected trip details

      // Optionally update UI or fetch updated data
    } catch (error) {
      console.error('Error accepting trip:', error);
      setError('Failed to accept trip. Please try again.');
    }
  };

  const handleDecline = async (tripId) => {
    try {
      // Perform decline logic here
      console.log('Trip declined:', tripId);

      // Emit notification to server
      socket.emit('sendNotification', {
        touristId: selectedTrip.touristId,
        message: `Tourist ${selectedTrip.touristId} trip declined`,
      });

      // Remove declined trip from UI
      setOrders(orders.filter(trip => trip._id !== tripId));
      setSelectedTrip(null); // Clear selected trip details

      // Optionally update UI or fetch updated data
    } catch (error) {
      console.error('Error declining trip:', error);
      setError('Failed to decline trip. Please try again.');
    }
  };

  return (
    <div className="p-6">
      {error && <div className="text-red-500">{error}</div>}
      <div className="mt-4 bg-white p-4 border rounded-lg shadow-sm">
        <table className="w-full text-left">
          <thead>
            <tr className="border-b">
              <th className="py-2">Name</th>
              <th className="py-2">Bid Price</th>
              <th className="py-2">Location</th>
              <th className="py-2">Actions</th>
            </tr>
          </thead>
          <tbody>
            {orders.map((trip, index) => (
              <React.Fragment key={index}>
                <tr className="border-b">
                  <td className="py-2">Anup</td>
                  <td className="py-2">{trip.priceBid}</td>
                  <td className="py-2">{trip.location}</td>
                  <td className="py-2">
                    <button
                      className="text-blue-500"
                      onClick={() => handleViewDetails(trip._id)}
                    >
                      View
                    </button>
                  </td>
                </tr>
                {selectedTrip && selectedTrip._id === trip._id && (
                  <tr className="border-b">
                    <td colSpan="4" className="p-4">
                      <div>
                        <p><strong>Date From:</strong> {selectedTrip.dateFrom}</p>
                        <p><strong>Date To:</strong> {selectedTrip.dateTo}</p>
                        <p><strong>Number of People:</strong> {selectedTrip.numPeople}</p>
                        <p><strong>Price Bid:</strong> {selectedTrip.priceBid}</p>
                        <div className="flex justify-end mt-4">
                          <button className="text-green-500 mr-2" onClick={() => handleAccept(selectedTrip._id)}>Accept</button>
                          <button className="text-red-500" onClick={() => handleDecline(selectedTrip._id)}>Decline</button>
                        </div>
                      </div>
                    </td>
                  </tr>
                )}
              </React.Fragment>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Request;
