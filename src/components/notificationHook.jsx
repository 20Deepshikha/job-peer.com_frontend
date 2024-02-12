// import { useEffect, useState } from 'react';
// import io from 'socket.io-client';

// const socket = io('http://localhost:8000', { withCredentials: true });

// const useNotifications = (username) => {
//     const [notifications, setNotifications] = useState([]);

//     useEffect(() => {
//         if (username) {
//             socket.emit('join', username);
//         }
//         console.log('entered the hook', username)
//         socket.on('connect_error', (err) => {
//             console.log(`connect_error due to ${err.message}`);
//           });

//         socket.on('notification', (notification) => {
//             console.log('Received notification:', notification);
//             setNotifications(prev => [...prev, notification]);
//             console.log(notifications)
//         });
        

//         return () => {
//             socket.off('notification');
//         };
//     }, [username]);

//     return notifications;
// };

// export default useNotifications;

import { useEffect, useState } from 'react';
import io from 'socket.io-client';
import api from '../config/axios';

// const socket = io('http://localhost:8000', { withCredentials: true });
// const socket = io('https://job-peer.onrender.com', { withCredentials: true });
// const socket = io('job-peer.onrender.com', { withCredentials: true });
const socket = io('https://job-peer.onrender.com', {
  withCredentials: true,
  transports: ['websocket']
});

const useNotifications = (username) => {
  const [notifications, setNotifications] = useState([]);

  const fetchStoredNotifications = async () => {
    try {
      const response = await api.get(`/notifications/${username}`);
      setNotifications(response.data); // Assuming the API returns an array of notifications
      console.log('notifications:', notifications)
    } catch (error) {
      console.error('Failed to fetch notifications:', error);
    }
  };

  useEffect(() => {
    if (username) {
      fetchStoredNotifications(); // Fetch stored notifications on mount
      socket.emit('join', username);
    }

    socket.on('notification', (notification) => {
      // Update notifications state with new notification
      setNotifications((prevNotifications) => [notification, ...prevNotifications]);
    });

    return () => {
      socket.off('notification');
    };
  }, [username]);

  return notifications;
};

export default useNotifications;
