const express = require("express")
const app = express()
app.use(express.urlencoded({ extended: true }))
const mongoose = require("mongoose")
const session = require("express-session")
const routers = require("./routes") 

app.set("view engine", "ejs")
app.use("/public", express.static("public"))

// const multer = require('multer')
// const upload = multer({dest: 'images/'})

// Session
app.use(session({
    secret: "secretKey",
    resave: false,
    saveUninitialized: false,
    cookie:{ maxAge: 300000 },
}))

// Connecting to MongoDB
const MONGO_URL = process.env.MONGO_URL;
mongoose.connect(MONGO_URL)
    .then(() => {
        console.log("Success: Connected to MongoDB")
    })
    .catch((error) => {
        console.error("Failure: Unconnected to MongoDB")
    })

app.use(routers)

// Page Notfound
app.get("*", (req, res) => {
    res.render("error", {message: "ページが存在しません"})
})

// Connecting to port
const port = process.env.PORT || 5000 

app.listen(port, () => {
    console.log(`Listening on ${port}`)
})

// module.exports = upload;