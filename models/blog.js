const mongoose = require("mongoose");

//スキーマ作成
const Schema = mongoose.Schema;
const BlogSchema = new Schema({
  title: String,
  summary: String,
  file: String,
  image: String,
  textBody: String,
  createDate: Date
});

const BlogModel = mongoose.model("Blog", BlogSchema);
module.exports = BlogModel
