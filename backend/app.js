const express = require('express');
const app = express();

app.use(express.json());

//Import all routes
const announcements = require('./routes/announcement');



app.use('/api/v1', announcements)


module.exports = app