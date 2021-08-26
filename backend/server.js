const app = require('./app');
const dotenv = require('dotenv');
const connectDatabase = require('./config/database');
const cloudinary = require('cloudinary').v2;
const { connect } = require('mongoose');

// Handle Uncaught exceptions
process.on('uncaughtException', err =>{
    console.log(`ERRORL: ${err.message}`);
    console.log('Shutting down server due to uncaught exceptions');
    process.exit(1)
})

// Setting up config file
dotenv.config({ path: 'backend/config/config.env'})


 
// Connecting to Database
connectDatabase();

//Setting up cloudinary config
cloudinary.config({
    cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET
})

const server = app.listen(process.env.PORT, () =>{
    console.log(`Server started on PORT: ${process.env.PORT} in ${process.env.NODE_ENV} mode.`);
})

// Handle Unhandled Promise Rejections
process.on('unhandledRejection', err => {
    console.log(`ERROR: ${err.message}`);
    console.log('Shutting Down the server due to Unhandled promise rejection')
    server.close(() =>{
        process.exit(1)
    })
})