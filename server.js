const express = require('express');
const colors = require('colors');
const dotenv = require('dotenv');
const morgan = require('morgan');
const connectDB = require('./config/db');
const authRoutes = require('./routes/authRoutes');
const categoryRoutes = require('./routes/categoryRoutes')
const cors = require('cors')

dotenv.config();

//rest object
const app = express()

//Connecting to database
connectDB();

//middlewares
app.use(express.json());
app.use(cors());
app.use(morgan('dev'));

//routes
app.use('/api/auth', authRoutes);
app.use('/api/category', categoryRoutes)

//api
app.get('/', (req, res) => {
    res.send("<h1>Welcome to the Ecommerce App.</h1>")
})

const PORT = process.env.PORT || 8080;

app.listen(PORT, () => {
    console.log(`Server is running on PORT ${PORT}`.bgGreen.white);
})