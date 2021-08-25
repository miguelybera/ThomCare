const {GridFsStorage} = require('multer-gridfs-storage');
const Grid = require('gridfs-stream');
const mongoose = require('mongoose');
const conn = mongoose.connection;
let gfs;
conn.once('open', () =>{
    gfs = Grid(conn.db, mongoose.mongo);
    gfs.collection('fileStorage');
})
const dotenv = require('dotenv');
dotenv.config({ path: 'backend/config/config.env'})
const fileStorage = new GridFsStorage({
    url: process.env.DB_URI,
    file: (req, file) =>{
        return new Promise((resolve, reject)=>{
                
                const filename = Date.now() + '-'+ (file.originalname);
                const fileInfo ={
                    filename: filename,
                    bucketName: 'fileStorage'
                };
                resolve(fileInfo);
            
        })
    }

})

module.exports = fileStorage