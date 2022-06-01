const mongoose = require('mongoose');

// TODO: Finish filling out properties
const TaskSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    }
});

module.exports = mongoose.model('Task', TaskSchema);
