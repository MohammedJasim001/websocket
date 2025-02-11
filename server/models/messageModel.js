import mongoose from "mongoose";

const messageSchema = new mongoose.Schema({
    sender:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'User'
    },
    receiver:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'User'
    },
    group: { // Only used for group chat
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Group',
        required: false
    },
    content:{
        type:String,
        required:false
    },
    image: {
        type:String,
        required:false
    },
    isRead:{
        type:Boolean,
        default:false
    },
    createdAt:{
        type:Date,
        default:Date.now
    }
},{timestamps:true})

const Message = mongoose.model('Message',messageSchema)
export default Message