// import Notification from "../models/notification.js"

// export const getNotification = async(req,res) => {
//     const {userId } = req.params
//     const notification = await Notification.find({user:userId,isRead:false}).populate('message')
//     res.status(200).json({ success: true, data: notification });
// }

// export const readNotification = async (req,res) =>{
//     const {id} = req.params
//     const notification = await Notification.findByIdAndUpdate(id,{isRead:true})
//     res.status(200).json({data:notification})
// }