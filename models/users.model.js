const mongoose = require("mongoose");
const mongoosePaginate = require("mongoose-paginate");
const Schema = mongoose.Schema;

const User = new Schema({
  id: {
    type: Number,
  },
  name: {
    type: String,
  },
  email: {
    type: String,
    unique: true,
    sparse: true,
  },
  password: {
    type: String,
  },
  role: {
    type: String,
  },
  department: {
    type: String,
  },
  designation: {
    type: String,
  },
  avatar: {
    type: String,
  },
  avatar_ext: {
    type: String,
  },
  verified: { type: Boolean, default: false },
  is_deleted: {
    type: Number,
    default: false,
  },
});

User.plugin(mongoosePaginate);

User.methods.toJSON = function () {
  var obj = this.toObject();
  delete obj.password;
  return obj;
};
// User.index({'$**': 'text'});

module.exports = mongoose.model("User", User);
