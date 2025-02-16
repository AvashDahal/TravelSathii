import React, { useEffect, useState } from 'react';
import axios from 'axios';

const ChatList = ({ chats, selectChat, role, setGuideId, setTouristId }) => {
  const [names, setNames] = useState({});

  useEffect(() => {
    const fetchNames = async () => {
      const uniqueSenderIds = Array.from(new Set(chats.map(chat => 
        role === 'guide' ? chat.touristId : chat.guideId
      )));

      const fetchedNames = {};
      
      await Promise.all(uniqueSenderIds.map(async (senderId) => {
        if (role === 'guide') {
          const response = await axios.get(`http://localhost:3000/api/v1/tourist/${senderId}`);
          fetchedNames[senderId] = response.data.fullName;
        } else {
          const response = await axios.get(`http://localhost:3000/api/v1/profile/guide/${senderId}`);
          fetchedNames[senderId] = response.data.name;
        }
      }));

      setNames(fetchedNames);
    };

    fetchNames();
  }, [chats, role]);

  const uniqueSenders = Array.from(new Set(chats.map(chat => 
    role === 'guide' ? chat.touristId : chat.guideId
  )));

  return (
    <div className="w-1/3 bg-gray-100 border-r border-gray-200 overflow-y-scroll">
      {uniqueSenders.map((senderId, index) => {
        const chat = chats.find(chat => 
          role === 'guide' ? chat.touristId === senderId : chat.guideId === senderId
        );
        if (!chat) return null;

        return (
          <div
            key={index}
            className="p-4 cursor-pointer hover:bg-gray-200"
            onClick={() => {
              selectChat(chat);
              setGuideId(chat.guideId);
              setTouristId(chat.touristId);
            }}
          >
            <p className="font-semibold">{names[senderId] || senderId}</p>
            <p className="text-sm text-gray-500">{chat.message}</p>
          </div>
        );
      })}
    </div>
  );
};

export default ChatList;
