import express from 'express'
import { listOrders, placeOrder, updateStatus, userOrder, verfyOrder } from '../controller/orderController.js'
import authMiddleware from '../config/auth.js'

const orderRouter = express.Router()

orderRouter.post('/place',authMiddleware, placeOrder)
orderRouter.post('/verify', verfyOrder)
orderRouter.post('/userorder', authMiddleware, userOrder)
orderRouter.get('/list', listOrders)
orderRouter.post('/status', updateStatus)

export default orderRouter