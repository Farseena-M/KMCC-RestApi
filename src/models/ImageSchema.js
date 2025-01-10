import mongoose from 'mongoose';

const imageSchema = new mongoose.Schema({
    photo: { type: String }
}, { timestamps: true })


const ImageSchema = mongoose.model('ImageSchema', imageSchema)
export default ImageSchema;