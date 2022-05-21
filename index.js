//index.js

const express = require("express");
const app = express();
app.use(express.urlencoded({ extended:true}));
const mongoose = require("mongoose");
const session = require("express-session");

app.set("view engine", "ejs");
app.use("/public", express.static("public"));

//セッション
app.use(session({
    secret: "secretKey",
    resave: false,
    saveUninitialized: false,
    cookie: {maxAge: 30000},
}));

//DB接続
mongoose.connect("mongodb+srv://tnkstr:c0untzer0-md@cluster0.kgaxe.mongodb.net/blogUserDatabase?retryWrites=true&w=majority")
    .then(() => {
        console.log("Success:Connected to MongoDB");
    })
    .catch((error) => {
        console.error("Failure:Unconnected to MongoDB");
    })

//スキーマ作成
const Schema = mongoose.Schema;
const BlogSchema = new Schema({
    title: String,
    summary: String,
    image: String,
    textBody: String
});
const UserSchema = new Schema({
    name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true
    }
});
const BlogModel = mongoose.model("Blog", BlogSchema);
const UserModel = mongoose.model("User", UserSchema);

//ブログ機能

////ブログ作成
app.get("/blog/create", (req, res) => {
    if(req.session.userId) {
        res.render("blogCreate");
    } else {
        res.redirect("/user/login")
    }
});

app.post("/blog/create", (req, res) => {
    BlogModel.create(req.body, (error, savedBlogData) => {
        if(error){
            res.render("error", {message: "/blog/createのエラー"});
        } else {
            res.redirect("/");
        }
    });
});

////全記事読み込み
app.get("/", async(req, res) => {
    const allBlogs = await BlogModel.find();
    res.render("index",{allBlogs:allBlogs, session:req.session.userId});
});

////単記事読み込み
app.get("/blog/:id", async(req, res) => {
    const singleBlog = await BlogModel.findById(req.params.id);
    res.render("blogRead", {singleBlog: singleBlog, session:req.session.userId});
});

////記事更新
app.get("/blog/update/:id", async(req, res) => {
    const singleBlog = await BlogModel.findById(req.params.id);
    res.render("blogUpdate", {singleBlog});
});

app.post("/blog/update/:id", (req, res) => {
    BlogModel.updateOne({ _id:req.params.id }, req.body).exec((error) => {
        if(error){
            res.render("error", {message:"/blog/updateのエラー"})
        } else {
            res.redirect("/");
        }
    });
});

////記事削除
app.get("/blog/delete/:id", async(req, res) => {
    const singleBlog = await BlogModel.findById(req.params.id);
    res.render("blogDelete", {singleBlog});
});

app.post("/blog/delete/:id", (req, res) => {
    BlogModel.deleteOne({ _id:req.params.id }, req.body).exec((error) => {
        if(error){
            res.render("error", {message:"/blog/deleteのエラー"})
        } else {
            res.redirect("/");
        }
    });
});

//ユーザー機能
//ユーザー登録
app.get("/user/create", (req, res) => {
    res.render("userCreate");
});

app.post("/user/create", (req, res) => {
    UserModel.create(req.body, (error, savedUserData) => {
        if(error){
            res.render("error", {message: "/user/createのエラー"})
        } else {
            res.redirect("/")
        }
    });
});

//ログイン
app.get("/user/login", (req, res) => {
    res.render("login");
});

app.post("/user/login", (req, res) => {
    UserModel.findOne({email: req.body.email}, (error, savedUserData) => {
        if(savedUserData) {
            //ユーザーが存在した場合
            if(req.body.password === savedUserData.password) {
                //パスワードが正しい場合
                req.session.userId = savedUserData._id; //セッション情報
                res.redirect("/")
            } else {
                //パスワードが誤っている場合
                res.render("error", {message: "/user/loginのエラー：パスワードが間違っています。"})
            }

        } else {
            //ユーザーが存在しない場合
            res.render("error", {message: "/user/loginのエラー：ユーザーが存在しません。"})
        }
    })
});

//ポートオープン
const port = process.env.PORT || 5000;

app.listen(port, () => {
    console.log(`Listening on ${port}`);
});


