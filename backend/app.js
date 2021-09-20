const express = require('express');
const app = express();
const cookieParser = require('cookie-parser')
const path = require('path')

const errorMiddleware = require('./middlewares/errors');

// Setting up config file
//if(process.env.NODE_ENV !== 'PRODUCTION') require('dotenv').config({ path: 'backend/config/config.env' })

app.use(express.json());
app.use(cookieParser());

//Import all routes
const announcements = require('./routes/announcement');
const auth = require('./routes/auth');
const conversation = require('./routes/conversation');
const message = require('./routes/message');
const request = require('./routes/request');
const audit = require('./routes/audit');
const announcementType = require('./routes/announcementType')
const course = require('./routes/course')
const form = require('./routes/form')

app.use('/api/v1', announcements)
app.use('/api/v1', auth)
app.use('/api/v1', conversation)
app.use('/api/v1', message)
app.use('/api/v1', request)
app.use('/api/v1', audit)
app.use('/api/v1', announcementType)
app.use('/api/v1', course)
app.use('/api/v1', form)

/*
if(process.env.NODE_ENV === 'PRODUCTION'){
    app.use(express.static(path.join(__dirname, '../frontend/build')))
    app.get('*', (req,res)=>{
        res.sendFile(path.resolve(__dirname, '../frontend/build/index.html'))
    })
}
*/
// Middleware to handle errors
app.use(errorMiddleware);

module.exports = app