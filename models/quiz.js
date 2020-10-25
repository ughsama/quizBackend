const mongoose = require("mongoose");

const quiz = mongoose.Schema({
  name: {
    type: String,
    required: true,
    unique: true,
  },
  _data: {
    type: Object,
    required: true,
  },
});

module.exports = mongoose.model("quiz", quiz);
