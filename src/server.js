import express from "express"
import ConnectDB from "./config/connectDB"
import configViewEngine from "./config/viewEngine"

// Init app
let app = express()
//connect to MongoDB
ConnectDB()

//Config view engine
configViewEngine(app)

app.get("/", (req, res) => {
    return res.render("main/master")
})
app.get("/login", (req, res) => {
    return res.render("auth/loginRegister")
})

app.listen(process.env.APP_PORT, process.env.APP_HOST, () =>{
    console.log(`server running at ${process.env.APP_HOST}:${process.env.APP_PORT}`)
})
