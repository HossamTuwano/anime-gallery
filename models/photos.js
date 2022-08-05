const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const imageSchema = new Schema({
  photo: {
    type: String,
    required: true,
  },
});

module.exports = mongoose.model("photo", imageSchema);
