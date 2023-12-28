import AWS from 'aws-sdk'
import multer from 'multer'
import multerS3 from 'multer-s3'
import path from 'path'
import { callbackify } from 'util';

AWS.config.update({
    region: 'ap-northeast-2',
    accessKeyId: 'AKIASCIKGTO3YFP3WUGD',
    secretAccessKey: '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',
});

const s3 = new AWS.S3()

const allowExtensions = ['.png', '.jpg', '.jpeg', '.gif', '.bmp']

const uploadRouter = multer({
    storage: multerS3({
        s3: s3,
        bucket: 'honghee',
        contentType: multerS3.AUTO_CONTENT_TYPE,
        key: (req, file, callback) =>{
            const uploadDirectory = req.query.directory ?? ''
            const extension = path.extname(file.originalname)
            if (!allowExtensions.includes(extension)){
                return callback(new Error('wrong extension'))
            }
            callback(null, '${uploadDirectory}/${Date.now()}_${file.originalname}')
        },
        acl: 'public-read-write'
    }),
})

export default uploadRouter