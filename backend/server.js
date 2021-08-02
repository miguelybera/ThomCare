const app = require('./app');
const dotenv = require('dotenv');
const connectDatabase = require('./config/database');
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