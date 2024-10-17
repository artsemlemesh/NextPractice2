const mongoose = require('mongoose');
const Schema = mongoose.Schema;


const workerSchema = new Schema({
    name: {
        type: String,
        required: true
    },
    age: {
        type: Number,
        required: true
    },
    position: {
        type: String,
        required: true
    },
    salary: {
        type: Number,
        required: true
    }
});
module.exports = mongoose.model('Worker', workerSchema);