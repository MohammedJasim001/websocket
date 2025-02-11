import Group from "../models/GroupModel.js"

export const createGroup = async(req,res) =>{
    const {groupName,createrId} = req.body

    const newGroup =  new Group({
        groupName,
        members:[createrId],
        createdBy:createrId
    })

    await newGroup.save()

    res.status(201).json(newGroup)
}

export const joinGroup = async (req,res) =>{
    const {userId,groupId} = req.body
    const group =await Group.findByIdAndUpdate(groupId)
     group.members.push(userId)
     await group.save()
    res.status(200).json(group)
}

export const getGroup = async (req,res) =>{
    const {groupId} = req.params
    const group = await Group.findById(groupId)
    res.status(200).json(group)
}

export const userGroup = async (req,res) =>{
    const {userId} = req.params 
    const group = await Group.find({members:userId})
    res.status(200).json(group)
    
}