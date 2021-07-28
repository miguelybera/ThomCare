const app = require('./app');
const dotenv = require('dotenv');
const connectDatabase = require('./config/database');
const { connect } = require('mongoose');

// Setting up config file
dotenv.config({ path: 'backend/config/config.env'})


// Connecting to Database
connectDatabase();

app.listen(process.env.PORT, () =>{
    console.log(`Server started on PORT: ${process.env.PORT} in ${process.env.NODE_ENV} mode.`);
})