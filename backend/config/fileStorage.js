const { CloudinaryStorage } = require('multer-storage-cloudinary');
const cloudinary = require('cloudinary').v2;


const fileStorage = new CloudinaryStorage({
    cloudinary: cloudinary,
    params: (req, file) =>{
        return new Promise((resolve, reject)=>{
                const filename = Date.now() + '-'+ (file.originalname);
                const fileInfo ={
                    public_id: filename,
                    folder: 'fileStorage',
                    resource_type: "raw"
                };
                resolve(fileInfo);
            
        })
    }

})

module.exports = fileStorage