const express = require('express');
const app = express();

const errorMiddleware = require('./middlewares/errors');

app.use(express.json());

//Import all routes
const announcements = require('./routes/announcement');



app.use('/api/v1', announcements)

// Middleware to handle errors
app.use(errorMiddleware);

module.exports = app