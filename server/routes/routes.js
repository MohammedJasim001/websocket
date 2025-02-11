import express from 'express'
import {  getGroupMessages, getMessage, getSingleMessage,  sendGroupMessage,  sendMessage } from '../controller/messageController.js'
import { getAllUser, loginUser } from '../controller/userController.js'
import { uploadImage } from '../middleware/imageUploadMiddleware.js'
import { createGroup, getGroup, joinGroup, userGroup } from '../controller/groupController.js'
// import { getNotification, readNotification } from '../controller/notificationController.js'

const router = express.Router()

router.post('/login',loginUser)
router.get('/users/:userId',getAllUser)

router.post('/message',uploadImage,sendMessage)
router.get('/message/:userId',getMessage)
router.get('/message/specific/:user1/:user2',getSingleMessage)

router.post('/group/create',createGroup)
router.put('/group/join',joinGroup)
router.get('/group/:groupId',getGroup)
router.get('/group/user/:userId',userGroup)

router.post('/message/group/send',sendGroupMessage)
router.get('/message/group/:groupId',getGroupMessages)

// router.get('/notification/:userId',getNotification)
// router.put('/notification/:id',readNotification)

export default(router)