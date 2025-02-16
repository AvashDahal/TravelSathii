import React, { useState, useEffect } from 'react';
import axios from 'axios';

import ChatBox from './chatBox';
import ChatList from './chatList';

const ChatPage = () => {
  const [chats, setChats] = useState([]);
  const [selectedChat, setSelectedChat] = useState(null);
  const [guideId, setGuideId] = useState(localStorage.getItem('guideId'));
  const [touristId, setTouristId] = useState(localStorage.getItem('touristId'));
  const role = localStorage.getItem('role');

  useEffect(() => {
    const fetchChats = async () => {
      try {
        let response;
        if (role === 'guide') {
          response = await axios.get(`http://localhost:3000/api/v1/chats/guide/${guideId}`);
        } else if (role === 'tourist') {
          response = await axios.get(`http://localhost:3000/api/v1/chats/tourist/${touristId}`);
        }
        setChats(response.data);
      } catch (error) {
        console.error('Error fetching chats', error);
      }
    };

    if (role && (guideId || touristId)) {
      fetchChats();
    }
  }, [role, guideId, touristId]);

  return (
    <div className="flex h-screen">
      <ChatList chats={chats} selectChat={setSelectedChat} role={role} setGuideId={setGuideId} setTouristId={setTouristId} />
      {selectedChat && <ChatBox guideId={guideId} touristId={touristId} selectedChat={selectedChat} role={role} />}
    </div>
  );
};

export default ChatPage;
