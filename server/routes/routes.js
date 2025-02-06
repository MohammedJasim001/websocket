import express from 'express'
import {  getMessage, getSingleMessage, sendMesage } from '../controller/messageController.js'
import { getAllUser, loginUser } from '../controller/userController.js'
import { getNotification, readNotification } from '../controller/notificationController.js'

const router = express.Router()

router.post('/login',loginUser)
router.get('/users/:userId',getAllUser)

router.post('/message',sendMesage)
router.get('/message/:userId',getMessage)
router.get('/message/specific/:user1/:user2',getSingleMessage)

router.get('/notification/:userId',getNotification)
router.put('/notification/:id',readNotification)

export default(router)