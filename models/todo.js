var mongoose= require("mongoose");

var Todo= mongoose.model('Todo', {
  name: {
    type: String,
    required: true,
    minlength: 1,
    trim: true
  },
  email: {
    type: String,
    default: false
  },
  password: {
    type: String,

  },
  phone: {
    type: String,

  }
});
module.exports = {Todo};
