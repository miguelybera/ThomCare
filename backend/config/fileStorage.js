const {GridFsStorage} = require('multer-gridfs-storage');
const fileStorage = new GridFsStorage({
    url: 'mongodb+srv://admin:admin@thomcare.xnkwv.mongodb.net/Thomcare?retryWrites=true&w=majority',
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