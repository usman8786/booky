const mongoose = require('mongoose');
const mongoosePaginate = require('mongoose-paginate');
const Schema = mongoose.Schema;

const Book = new Schema({
     name: {
        type: String
    },
     ibn: {
        type: String,
        unique: true,
        sparse:true
    },
     author: {
        type: String
    },
    image_url: {
        type: String
    },
    is_deleted: {
        type: Boolean,
        default: false
    },
    user_id:{
        type: String
    }
});

Book.plugin(mongoosePaginate);

module.exports = mongoose.model("Book", Book);