const BlogModel = require("../../models/blog");

module.exports = (req, res) => {
  req.body.createDate = today.toISOString();
//  req.body.createDate = "2022-07-01T10:00:00.000+00:00";
  BlogModel.create(req.body, (error, savedBlogData) => {
    if (error) {
      res.render("error", { message: "/blog/createのエラー" });
    } else {
      res.redirect("/");
    }
  });
}

