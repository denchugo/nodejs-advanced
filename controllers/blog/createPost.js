const BlogModel = require("../../models/blog");

module.exports = (req, res) => {
  //投稿日時をセット
  const now = new Date();
  req.body.createDate = now.toISOString();
  req.body.file = req.file.filename;
  // console.log(req.body);
  // console.log(req.file);
  BlogModel.create(req.body, (error, savedBlogData) => {
    if (error) {
      res.render("error", { message: "/blog/createのエラー" });
    } else {
      res.redirect("/");
    }
  });
}

