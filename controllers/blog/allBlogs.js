const BlogModel = require("../../models/blog");

////全記事読み込み
module.exports = async(req, res) => {
  const allBlogs = await BlogModel.find().sort('date')
  res.render("index", { allBlogs: allBlogs, session: req.session.userId })
}
