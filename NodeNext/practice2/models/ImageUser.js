
const mongoose = require('mongoose');


const imageUserSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    profileImage: {
        type: String,
        required: false
    },
    createdAt: {
        type: Date,
        default: Date.now
    }
})

const ImageUser = mongoose.model('ImageUser', imageUserSchema);

module.exports = ImageUser;
