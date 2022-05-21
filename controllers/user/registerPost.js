const UserModel = require("../../models/user");

//ユーザー登録

module.exports = (req, res) => {
  UserModel.create(req.body, (error, savedUserData) => {
    if (error) {
      res.render("error", { message: "/user/createのエラー" })
    } else {
      res.redirect("/")
    }
  });
}
