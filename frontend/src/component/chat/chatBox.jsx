import React, { useState, useEffect, useRef } from 'react';
import io from 'socket.io-client';
import axios from 'axios';

const ChatBox = ({ guideId, touristId, selectedChat, role }) => {
  const [messages, setMessages] = useState([]);
  const [message, setMessage] = useState('');
  const socket = useRef(null);
  const messagesEndRef = useRef(null);

  useEffect(() => {
    socket.current = io('http://localhost:3000');
    socket.current.on("connect", () => {
      console.log(socket.current.id);
    });

    socket.current.on('message', (msg) => {
      setMessages(prevMessages => [...prevMessages, msg]);
      scrollToBottom();
    });

    return () => {
      socket.current.disconnect();
    };
  }, []);

  const scrollToBottom = () => {
    const chatBox = document.getElementById('chat-box');
    if (chatBox) {
      chatBox.scrollTop = chatBox.scrollHeight;
    }
  };

  useEffect(() => {
    if (selectedChat) {
      const fetchMessages = async () => {
        try {
          const response = await axios.get(`http://localhost:3000/api/v1/chats/${guideId}/${touristId}`);
          setMessages(response.data);
        } catch (error) {
          console.error('Error fetching messages', error);
        }
      };

      fetchMessages();
      socket.current.emit('joinRoom', { guideId, touristId });
    }
  }, [guideId, touristId, selectedChat]);

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const sendMessage = () => {
    const sender = role === 'guide' ? 'guide' : 'tourist';
    socket.current.emit('chatMessage', { guideId, touristId, message, sender });
    axios.post('http://localhost:3000/api/v1/chats', { guideId, touristId, message, sender })
      .then(() => setMessage(''))
      .catch(error => console.error('Error sending message', error));
  };

  return (
    <div className="flex flex-col w-2/3 bg-white p-4 border-l border-gray-200">
      <div id="chat-box" className="overflow-y-scroll h-96 flex-1 p-4">
        {messages.map((msg, index) => (
          <div key={index} className={`p-2 ${msg.sender === (role === 'guide' ? 'guide' : 'tourist') ? 'text-right' : 'text-left'}`}>
            <p className="inline-block bg-gray-200 p-2 rounded-lg">{msg.message}</p>
          </div>
        ))}
        <div ref={messagesEndRef} />
      </div>
      <div className="mt-4 flex">
        <input
          type="text"
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          className="border p-2 flex-grow"
          placeholder="Type your message..."
        />
        <button onClick={sendMessage} className="ml-2 p-2 bg-blue-500 text-white rounded-lg">
          Send
        </button>
      </div>
    </div>
  );
};

export default ChatBox;
