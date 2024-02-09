import { useEffect, useState } from 'react';
import io from 'socket.io-client';

const socket = io('http://localhost:8000', { withCredentials: true });

const useNotifications = (username) => {
    const [notifications, setNotifications] = useState([]);

    useEffect(() => {
        if (username) {
            socket.emit('join', username);
        }
        console.log('entered the hook', username)
        socket.on('connect_error', (err) => {
            console.log(`connect_error due to ${err.message}`);
          });

        socket.on('notification', (notification) => {
            console.log('Received notification:', notification);
            setNotifications(prev => [...prev, notification]);
            console.log(notifications)
        });
        

        return () => {
            socket.off('notification');
        };
    }, [username]);

    return notifications;
};

export default useNotifications;
