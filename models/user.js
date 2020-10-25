const mongoose = require("mongoose");

const user = mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    unique: true,
    required: true,
  },
  password: {
    type: String,
    required: true,
  },
  history: {
    type: Array,
    required: true,
    default: [],
  },
});

module.exports = mongoose.model("user", user);
