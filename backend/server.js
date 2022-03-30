const express = require('express')
const dotenv = require('dotenv').config()
const colors = require('colors')
const cors = require('cors')
const path = require('path')
const connectDB = require('./config/db')
const { errorHandler } = require('./middleware/errorMiddleware')
const port = process.env.PORT || 5000

const app = express()
connectDB()
//middleware
app.use(express.json())
app.use(cors())
app.use(express.urlencoded({ extended: false}))

app.use('/api/goals', require('./routes/goalRoutes'))
app.use('/api/users', require('./routes/userRoutes'))
app.use(errorHandler)
//serve frontend
if(process.env.NODE_ENV == 'production') {
    app.use(express.static(path.join(__dirname,'../frontend/build')))
    app.get('*', (req, res) => {
        res.sendFile(path.resolve(__dirname,'../','frontend','build', 'index.html'))
    })
} else {
    app.get('/', (req, res) => {
        res.send('please set to production')
    })
}

app.listen(port, () => console.log(`server started on port ${port}`))