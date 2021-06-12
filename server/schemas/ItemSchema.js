const mongoose = require('mongoose')
const Schema2 = mongoose.Schema;

const usersSchema = new Schema2({
    item: {
        type: String,
        required: true
    },
    clientEmail: {
        type: String,
        required: true
    }
})

module.exports = mongoose.model("listItemDb", usersSchema)



