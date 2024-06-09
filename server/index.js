import express from 'express'
import cors from 'cors'
import dotenv from 'dotenv'
import dbConnection from './config/db.js'
import foodRouter from './routes/foodRoute.js'
import bodyParser from 'body-parser'
import userRouter from './routes/userRoutes.js'
import cartRouter from './routes/cartRoutes.js'
import orderRouter from './routes/orderRoutes.js'

// app config
const app = express()
const PORT = 3500
dotenv.config()

// middleware
app.use(express.json())
app.use(cors())

// database
dbConnection()

// api endpoints
app.use('/api/food', foodRouter)
app.use('/images', express.static('uploads'))

app.use('/api/user', userRouter)

app.use('/api/cart',cartRouter)


app.use('/api/order',orderRouter)
// listing server
app.listen(PORT , () => {
    console.log(`server started on ${PORT}`)
})