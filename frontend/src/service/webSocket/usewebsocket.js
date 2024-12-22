// useWebSocket.js
import { useEffect } from 'react';
import socket from './socket';

const useWebSocket = (onMessageReceived) => {
  useEffect(() => {
    // Notify when WebSocket connection is established
    socket.on('connect', () => {
      console.log('WebSocket connected successfully.');
    });

    // Listen for 'newmessage' from the WebSocket server
    socket.on('newmessage', (data) => {
      console.log('Received new message:', data);
      onMessageReceived(data); // Call the callback with the new message data
    });

    // Cleanup on component unmount
    return () => {
      socket.off('connect'); // Cleanup the connect event listener
      socket.off('newmessage'); // Cleanup the newmessage event listener
    };
  }, [onMessageReceived]);

  return { socket }; // You can use the socket instance for other operations if needed
};

export default useWebSocket;
