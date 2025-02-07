import Message from "../models/messageModel.js";


export const sendMessage = async (req, res) => {
    try {
        const { sender, receiver, content } = req.body;

        const newMessage = new Message({
            sender,
            receiver,
            content:content ||"",
            image:req.cloudinaryImageUrl // Store image in database
        });

        await newMessage.save();

        res.status(201).json({ message: "Message sent successfully", data: newMessage });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: "Server error" });
    }
};

export const getMessage = async (req, res) => {
    try {
        const { userId } = req.params;

        const messages = await Message.find({
            $or: [{ sender: userId }, { receiver: userId }]
        }).populate('sender').populate('receiver');

        res.status(200).json({ messages });
    } catch (error) {
        res.status(500).json({ error: "Server error" });
    }
};

export const getSingleMessage = async (req, res) => {
    try {
        const { user1, user2 } = req.params;

        const messages = await Message.find({
            $or: [
                { sender: user1, receiver: user2 },
                { sender: user2, receiver: user1 }
            ]
        }).sort({ timestamp: 1 })
        .populate('sender')
        .populate('receiver');

        res.status(200).json({ messages });
    } catch (error) {
        res.status(500).json({ error: "Server error" });
    }
};
