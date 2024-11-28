import multer from 'multer';
import path from 'path';
import fs from 'fs';
import { fileURLToPath } from 'url';
import { v2 as cloudinary } from 'cloudinary';
import dotenv from 'dotenv';
dotenv.config();

cloudinary.config({
    cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET,
});

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const storage = multer.diskStorage({
    destination: path.join(__dirname, "profile"),
    filename: (req, file, cb) => {
        cb(null, `${file.fieldname}_${Date.now()}_${file.originalname}`);
    },
});

const upload = multer({ storage });

const UploadImage = (req, res, next) => {
    upload.single('photo')(req, res, async (err) => {
        if (err) {
            return res.status(400).json({
                status: 'error',
                message: err.message,
            });
        }

        if (req.file) {
            try {
                const result = await cloudinary.uploader.upload(req.file.path, {
                    folder: 'Images',
                });
                req.body.image = result.secure_url;

                fs.unlink(req.file.path, (unlinkError) => {
                    if (unlinkError) {
                        console.log(`Error deleting local file: ${unlinkError.message}`);
                    }
                });

                next();
            } catch (error) {
                console.error('Cloudinary upload error:', error);
                next(error);
            }
        } else {
            next();
        }
    });
};

export default UploadImage;
