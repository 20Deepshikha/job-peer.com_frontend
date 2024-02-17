import React, { useState, useEffect } from 'react';
import Navbar from './Navbar';
import { ChatBubbleOvalLeftIcon, XMarkIcon } from '@heroicons/react/24/outline';
import api from '../config/axios';

export default function Peerchat() {
  const [peerJobs, setPeerJobs] = useState([]);
  const [activeChatUser, setActiveChatUser] = useState(null);
  const [activeChatUserName, setActiveChatUserName] = useState("");
  const [message, setMessage] = useState("");
  const [isChatOpen, setIsChatOpen] = useState(false);

  useEffect(() => {
    const fetchPeers = async () => {
      const storedUser = JSON.parse(sessionStorage.getItem('User')).username;
      try {
        const response = await api.get(`/confirmedPeer/${storedUser}`);
        setPeerJobs(response.data.map(peer => {
          return peer.requestedPeerLeaderBoard.username !== storedUser
            ? peer.requestedPeerLeaderBoard
            : peer.requestingPeerLeaderBoard;
        }).filter(peer => peer !== null));
      } catch (error) {
        console.error('Error fetching peer jobs:', error);
      }
    };

    fetchPeers();
  }, []);

  const startChat = (username, name) => {
    setActiveChatUser(username);
    setActiveChatUserName(name);
    setIsChatOpen(true);
  };

  const closeChat = () => {
    setActiveChatUser(null);
    setActiveChatUserName("");
    setIsChatOpen(false);
  };

  const handleSendMessage = () => {
    // Implement send message logic here
    setMessage("");
  };

  return (
    <div className="flex flex-col h-screen">
      <Navbar />
      <div className="flex flex-1">
        {/* Sidebar */}
        <div className={`${isChatOpen ? 'hidden' : 'block'} md:flex flex-col md:w-80 bg-white shadow-md md:shadow-none z-10 md:z-auto overflow-y-auto`}>
  <div className="p-4 border-b md:border-b-0">
    <h2 className="text-lg font-semibold">Friends</h2>
  </div>
  <ul>
    {peerJobs.map((peer) => (
      <li key={peer.username} className="flex justify-between items-center p-2 hover:bg-gray-100">
        <div className="overflow-auto whitespace-nowrap">
          <span className="text-sm font-medium">{peer.name} (@{peer.username})</span>
        </div>
        <button
          className="ml-2 inline-flex items-center px-3 py-1 border border-transparent rounded-md text-xs font-medium text-white bg-blue-500 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
          onClick={() => startChat(peer.username, peer.name)}
        >
          Chat
        </button>
      </li>
    ))}
  </ul>
</div>

        {/* Main content area */}
        <div className={`${
            isChatOpen || activeChatUser ? 'flex' : 'hidden'
          } md:flex md:w-2/3 flex-1 flex-col`}>
          {activeChatUser ? (
            <div className="flex flex-col flex-grow border-l md:border-l-0 rounded-lg shadow">
              {/* Chat header */}
              <div className="flex items-center justify-between p-4 border-b">
                <h3 className="text-lg font-medium">Chat with {activeChatUserName}</h3>
                <button onClick={closeChat} className="rounded-full p-1 hover:bg-gray-200">
                  <XMarkIcon className="h-6 w-6" aria-hidden="true" />
                </button>
              </div>
              {/* Chat messages */}
              <div className="flex-1 overflow-y-auto p-4">
                <p>Message history with {activeChatUserName}...</p>
                {/* Chat messages will be rendered here */}
              </div>
              {/* Chat input */}
              <div className="p-4 border-t">
                <input
                  type="text"
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  placeholder="Type a message..."
                  className="w-full p-2 border rounded"
                />
                <button
                  onClick={handleSendMessage}
                  disabled={!message}
                  className="mt-2 px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-700 disabled:opacity-50"
                >
                  Send
                </button>
              </div>
            </div>
          ) : (
            <div className="flex flex-grow justify-center items-center">
              <ChatBubbleOvalLeftIcon className="h-20 w-20 text-gray-400" aria-hidden="true" />
              <p className="mt-2 text-lg text-gray-600">Select a friend to start chatting</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
