import React, { useState, useEffect } from "react";
import axios from "axios";
import { io } from "socket.io-client"; // Import socket.io client

const GroupChat = ({ groupId, token }) => {
  const [message, setMessage] = useState(""); // Tin nhắn người dùng đang nhập
  const [messages, setMessages] = useState([]); // Tin nhắn trong group
  const [socket, setSocket] = useState(null); // Trạng thái kết nối socket

  // Callback để nhận tin nhắn mới
  const onMessageReceived = (newMessage) => {
    setMessages((prevMessages) => [ ...prevMessages, newMessage]);
  };

  // Fetch tin nhắn khi component mount
  useEffect(() => {
    const fetchMessages = async () => {
      if (!groupId || !token) return; // Nếu groupId hoặc token chưa có thì không thực hiện fetch

      try {
        const response = await axios.get(
          `http://localhost:3001/chat/getmessagegroup/${groupId}`,
          {
            headers: { Authorization: `Bearer ${token}` },
          }
        );
        setMessages(response.data.messages); // Cập nhật tin nhắn từ server
      } catch (error) {
        console.error("Error fetching messages:", error);
      }
    };

    fetchMessages();
  }, [groupId, token]); // Chỉ fetch lại khi groupId hoặc token thay đổi

  // Kết nối WebSocket khi cả groupId và token đều có giá trị
  useEffect(() => {
    if (groupId && token) {
      const URL = "http://localhost:3002"; // Địa chỉ WebSocket server
      const socketConnection = io(URL, {
        extraHeaders: {
          Authorization: `Bearer ${token}`,
        },
      });

      socketConnection.on("connect", () => {
        console.log("Connected to WebSocket with ID:", socketConnection.id);

        // Tham gia nhóm khi kết nối
        socketConnection.emit("joinGroup", groupId);
      });

      // Lắng nghe sự kiện nhận tin nhắn mới
      socketConnection.on("newmessage", (data) => {
        console.log("New message received:", data);
        onMessageReceived(data); // Cập nhật giao diện
      });

      // Lưu socket để sử dụng sau
      setSocket(socketConnection);

      // Cleanup khi component bị unmount
      return () => {
        socketConnection.disconnect();
      };
    }
  }, [groupId, token]); // Kết nối lại nếu groupId hoặc token thay đổi

  return (
    <div>
      <h2>Group Chat: {groupId}</h2>

      {/* Message List */}
      <div
        style={{
          maxHeight: "300px",
          overflowY: "auto",
          border: "1px solid #ddd",
          padding: "10px",
          marginBottom: "10px",
        }}
      >
        {messages.map((msg, index) => (
          <div key={index} style={{ marginBottom: "8px" }}>
            <strong>
              {msg.author?.firstName} {msg.author?.lastName}:
            </strong>{" "}
            {msg.content}
          </div>
        ))}
      </div>

      {/* Send Message Form */}
      <div>
        <input
          type="text"
          placeholder="Type a message"
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          style={{ width: "80%", padding: "10px" }}
        />
        <button
          style={{ padding: "10px 15px", marginLeft: "10px" }}
        >
          Send
        </button>
      </div>
    </div>
  );
};

export default GroupChat;