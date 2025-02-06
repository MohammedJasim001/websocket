import User from "../models/userModel.js"

export const loginUser = async(req,res) =>{
    const {email,password} = req.body
    // const newUser = new User ({
    //     name,
    //     email,
    //     password
    // })
    // await newUser.save()
    const user =await User.findOne({email})
    if (!user) {
        return res.status(404).json({ message: "User not found" });
    }
    if (user.password !== password) {
        return res.status(400).json({ message: "Invalid credentials" });
    }

    res.status(201).json({message:"user logined",data:user})
}

export const getAllUser = async (req,res) =>{
    const {userId} = req.params
    const user = await User.find({_id:{$ne:userId}})
    res.status(200).json({user})
}