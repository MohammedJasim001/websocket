import Message from "../models/messageModel.js"
import Notification from "../models/notification.js";

export const sendMesage = async(req,res) =>{
    const {sender,receiver,content} = req.body;
    const newMessage = new Message ({
        sender,
        receiver,
        content
    })
   await newMessage.save()

//    const notification = new Notification({ user: receiver, message: newMessage._id });
//     await notification.save();


    res.status(201).json({messsage:"message sent sunccessfully",data:newMessage})

}

export const getMessage =async(req,res)=>{
    const {userId} = req.params

    const message = await Message.find({
        $or:[{sender:userId},{receiver:userId}]
    })
    .populate('sender')
    .populate('receiver')

    res.status(200).json({message})
}

export const getSingleMessage = async (req,res)=>{
    const {user1,user2} = req.params

    const messages = await Message.find({
        $or:[
            {sender:user1,receiver:user2},
            {sender:user2,receiver:user1}
        ]
    })
    .sort({timestamp:1})
    .populate('sender')
    .populate('receiver')

    res.status(200).json({messages})
}