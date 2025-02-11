import { useContext, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { io } from "socket.io-client";
import { getGroupMessages, sendGroupMessage } from "../service/api";
import { UserData } from "../App";

const socket = io("http://localhost:4000");

const GroupChat = () => {
    const { userId } = useContext(UserData);
    const { groupId } = useParams();
    const [groupMessages, setGroupMessages] = useState([]);
    const [message, setMessage] = useState("");


    useEffect(() => {
        const fetchMessages = async () => {
            const messages = await getGroupMessages(groupId);
            setGroupMessages(messages.messages);
        };
        fetchMessages();

        // ✅ Join the room when the component mounts
        socket.emit("join_room", groupId);

        // ✅ Listen for new messages
        socket.on("receive_group_message", (data) => {
            setGroupMessages((prevMessages) => [...prevMessages, data]);``
        });

        return () => {
            socket.off("receive_group_message"); // Cleanup listener
            socket.emit("leave_room", groupId); // Leave the room when unmounting
        };
    }, [groupId]);

    const handleSendMessage = async () => {
        if (!message.trim()) return;

        const newMessage = { sender: userId, group: groupId, content: message };


        try {
            const response = await sendGroupMessage(newMessage);

                socket.emit("send_group_message", response.data); // Send real message
        } catch (error) {
            console.error("Error sending message:", error);
        }

        setMessage("");
    };

    return (
        <div className="p-5">
            <h2>Group Chat</h2>

            <div>
                {groupMessages.map((msg, ind) => (
                    <li key={ind}>
                        {msg.sender.name}: <span>{msg.content}</span>
                    </li>
                ))}
            </div>

            <input
                value={message}
                type="text"
                placeholder="Type a message..."
                onChange={(e) => setMessage(e.target.value)}
            />
            <button onClick={handleSendMessage}>Send</button>
        </div>
    );
};

export default GroupChat;
