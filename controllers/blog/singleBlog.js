const BlogModel = require("../../models/blog");

////単記事読み込み
module.exports = async (req, res) => {
  const singleBlog = await BlogModel.findById(req.params.id);
  res.render("blogRead", { singleBlog: singleBlog, session: req.session.userId });
}
