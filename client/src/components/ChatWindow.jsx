import { useContext, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import io from "socket.io-client";
import { UserData } from "../App";
import { getSingleMessages, sendeMessage } from "../service/api";

const socket = io.connect("http://localhost:4000");

const ChatWindow = () => {
  const { userId } = useContext(UserData);
  const { Id } = useParams();

  const [message, setMessage] = useState("");
  const [newMessage, setnewMessage] = useState([]);
  const [image, setImage] = useState(null)

  console.log(newMessage, "newMessage");

  // ✅ Function to send message
  const handleSendMessage = async () => {
    if (!message.trim() && !image) return;

    const formData = new FormData();
    formData.append("sender", userId);
    formData.append("receiver", Id);
    
    if (message.trim()) {
      formData.append("content", message); // ✅ Only append text if available
    }

    if (image) {
      formData.append("image", image);
    }

    try {
      const response = await sendeMessage(formData); 
      const sentMessage = response.data; 

      socket.emit("send_message", sentMessage); 

      // setnewMessage((prev) => [...prev, sentMessage]);
      setImage(null);
      
      setMessage("");
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    const fetchMessages = async () => {
      try {
        const data = await getSingleMessages(userId, Id);
        console.log(data.messages, "Fetched Messages");
        setnewMessage(data.messages);
      } catch (error) {
        console.error("Error fetching messages:", error);
      }
    };
    fetchMessages();
  }, [userId, Id]);

  useEffect(() => {
    const receiveMessageHandler = (data) => {
      setnewMessage((prev) => [...prev, {...data,sender:{_id:data.sender}}]); 
    };

    socket.on("receive_message", receiveMessageHandler);

    return () => {
      socket.off("receive_message", receiveMessageHandler); // Cleanup listener on unmount
    };
  }, []);

  return (
    <div>
      <h2>Chat Window</h2>
      <ul>
        {newMessage.map((msg, index) => (
          <li key={index}>
            <strong>{msg?.sender?._id === userId ? "You" : "Them"}:</strong> {msg.content}
            {msg.image&&(
              <img src={msg.image} 
              alt="Sent"
                style={{ width: "150px", height: "150px", objectFit: "cover", borderRadius: "10px" }}
              />
            )}
          </li>
        ))}
      </ul>
      <input
        value={message}
        type="text"
        placeholder="Type a message..."
        onChange={(e) => setMessage(e.target.value)}
      />
      <input type="file" 
      accept="image/*"
      onChange={(e)=>setImage(e.target.files[0])}
      />
      <button onClick={handleSendMessage}>Send</button>
    </div>
  );
};

export default ChatWindow;
