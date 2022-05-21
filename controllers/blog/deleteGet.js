const BlogModel = require("../../models/blog");

////記事削除
module.exports = async (req, res) => {
  const singleBlog = await BlogModel.findById(req.params.id);
  res.render("blogDelete", { singleBlog });
}
