const mongoose = require('mongoose');

const problemSchema = new mongoose.Schema({
    problemId: {
        type: String,
        required: true,
    },
    quesLink: {
        type: String,
        required: true,
    },
    sheetId: {
        type: String,
        required: true,
    },
});

module.exports = mongoose.model('Created_Sheet_Problem', problemSchema);