const BlogModel = require("../../models/blog");

////全記事読み込み
module.exports = async(req, res) => {
  const allBlogs = await BlogModel.find()
  res.render("index", { allBlogs: allBlogs, session: req.session.userId })
}

console.log("call_allblogs");