const BlogModel = require("../../models/blog");

module.exports = (req, res) => {
  console.log(req.body);
  BlogModel.create(req.body, (error, savedBlogData) => {
    if (error) {
      res.render("error", { message: "/blog/createのエラー" });
    } else {
      res.redirect("/");
    }
  });
}

