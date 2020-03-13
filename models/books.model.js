const mongoose = require("mongoose");
const mongoosePaginate = require("mongoose-paginate");
const Schema = mongoose.Schema;

const Book = new Schema({
  name: {
    type: String
  },
  cprice: {
    type: Number
  },
  sprice: {
    type: Number
  },
  image_url: {
    type: String
  },
  is_deleted: {
    type: Boolean,
    default: false
  },
  user_id: {
    type: String
  }
});

Book.plugin(mongoosePaginate);

module.exports = mongoose.model("Book", Book);
