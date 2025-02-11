import mongoose from "mongoose";

const groupSchema = new mongoose.Schema({
    groupName :{
        type:String,    
    },
    members: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User", 
        }
    ],
    createdBy: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true, // Stores the ID of the person who created the group
    }
})
const Group = mongoose.model('Group',groupSchema)
export default Group