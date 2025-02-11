import Message from "../models/messageModel.js";


export const sendMessage = async (req, res) => {
    try {
        const { sender, receiver, content, group } = req.body;

        const newMessage = new Message({
            sender,
            receiver,
            content:content ||"",
            image:req.cloudinaryImageUrl,
            group: group || null // Store image in database
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


export const sendGroupMessage = async (req, res) => {
    try {
        const { sender, group, content } = req.body;

        if (!group) {
            return res.status(400).json({ error: "Group ID is required" });
        }
        if (!content) {
            return res.status(400).json({ error: "Message content is required" });
        }

        // Create new message
        const newMessage = new Message({
            sender,
            group,
            content
        });

        await newMessage.save();

        // Populate sender details before sending response
        const populatedMessage = await newMessage.populate("sender", "name");

        res.status(201).json({ 
            message: "Group message sent successfully", 
            data: populatedMessage 
        });

    } catch (error) {
        console.error(error);
        res.status(500).json({ error: "Server error" });
    }
};



export const getGroupMessages = async (req, res) => {
    try {
        const { groupId } = req.params;

        if (!groupId) {
            return res.status(400).json({ error: "Group ID is required" });
        }

        const messages = await Message.find({ group: groupId })
            .populate('sender', 'name email') 
            .sort({ createdAt: 1 }); 

        res.status(200).json({ messages });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: "Server error" });
    }
};

