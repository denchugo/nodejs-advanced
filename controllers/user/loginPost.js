const UserModel = require("../../models/user");

module.exports = (req, res) => {
  UserModel.findOne({ email: req.body.email }, (error, savedUserData) => {
    if (savedUserData) {
      //ユーザーが存在した場合
      if (req.body.password === savedUserData.password) {
        //パスワードが正しい場合
        req.session.userId = savedUserData._id; //セッション情報
        res.redirect("/")
      } else {
        //パスワードが誤っている場合
        res.render("error", { message: "/user/loginのエラー：パスワードが間違っています。" })
      }

    } else {
      //ユーザーが存在しない場合
      res.render("error", { message: "/user/loginのエラー：ユーザーが存在しません。" })
    }
  })
}
