const express = require('express');
const app = express();
const cookieParser = require('cookie-parser')

const errorMiddleware = require('./middlewares/errors');

app.use(express.json());
app.use(cookieParser());

//Import all routes
const announcements = require('./routes/announcement');
const auth = require('./routes/auth');
const conversation = require('./routes/conversation');
const message = require('./routes/message');



app.use('/api/v1', announcements)
app.use('/api/v1', auth)
app.use('/api/v1', conversation)
app.use('/api/v1', message)
// Middleware to handle errors
app.use(errorMiddleware);

module.exports = app