import { useEffect } from 'react';
import socket from '../../../service/webSocket/socket';

const useSocketAddFriend = (onMessageReceived) => {
  useEffect(() => {
    // Notify connection success
    socket.on('connect', () => {
      console.log('WebSocket connected successfully for AddFriend.');
    });

    // Example listener (if needed)
    socket.on('friendAdded', (data) => {
      console.log('Friend added:', data);
      onMessageReceived(data); // Pass data to the callback
    });

    // Cleanup
    return () => {
      socket.off('connect');
      socket.off('friendAdded');
    };
  }, [onMessageReceived]);

  // Function to emit events
  const emitEvent = (event, data) => {
    socket.emit(event, data);
  };

  return { emitEvent };
};

export default useSocketAddFriend;
