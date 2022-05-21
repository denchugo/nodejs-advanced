////ブログ作成
module.exports = async (req, res) => {
  if (req.session.userId) {
    res.render("blogCreate");
  } else {
    res.redirect("/user/login")
  }
};
