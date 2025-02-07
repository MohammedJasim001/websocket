import axios from 'axios'

const url = 'http://localhost:4000/api/user'

export const loginUser = async(data)=>{
    const res = await axios.post(`${url}/login`,data)
    return res.data
}

export const allUser = async (userId)=>{
    const res = await axios.get(`${url}/users/${userId}`)
    return res.data
}

export const sendeMessage = async(formData)=>{
    const res = await axios.post(`${url}/message`,formData,{
        headers:{"Content-Type":"multipart/form-data"}
    })
    return res.data
}

export const receiveMessage = async(userId)=>{
    const res = await axios.get(`${url}/message/${userId}`)
    return res.data
}

export const getSingleMessages = async(user1,user2)=>{
    const res = await axios.get(`${url}/message/specific/${user1}/${user2}`)
    return res.data
}

export const getNotification = async (userId) =>{
    const res = await axios.get(`${url}/notification/${userId}`)
    return res.data
}