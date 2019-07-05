import express from "express"
import ConnectDB from "./config/connectDB"
import configViewEngine from "./config/viewEngine"
import initRoutes from "./routes/web"
import bodyParser from "body-parser"
import connectFash from "connect-flash"
import configSession from "./config/session"
import passport from "passport"

import pem from "pem"
import https from "https"
// pem.createCertificate({ days: 1, selfSigned: true }, function (err, keys) {
//     if (err) {
//       throw err
//     }
//     // Init app
//     let app = express()
//     //connect to MongoDB
//     ConnectDB()

//     // Config session
//     configSession(app)

//     //Config view engine
//     configViewEngine(app)

//     //Enable post data for request
//     app.use(bodyParser.urlencoded({extended: true}))

//     //Enable flash messages
//     app.use(connectFash())

//     //config passport
//     app.use(passport.initialize())
//     app.use(passport.session())
//     //Init all routes
//     initRoutes(app)

//     https.createServer({ key: keys.serviceKey, cert: keys.certificate }, app).listen(process.env.APP_PORT, process.env.APP_HOST, () =>{
//         console.log(`server running at ${process.env.APP_HOST}:${process.env.APP_PORT}`)
//     })
// })

// Init app
let app = express()
//connect to MongoDB
ConnectDB()

// Config session
configSession(app)

//Config view engine
configViewEngine(app)

//Enable post data for request
app.use(bodyParser.urlencoded({extended: true}))

//Enable flash messages
app.use(connectFash())

//config passport
app.use(passport.initialize())
app.use(passport.session())
//Init all routes
initRoutes(app)

app.listen(process.env.APP_PORT, process.env.APP_HOST, () =>{
    console.log(`server running at ${process.env.APP_HOST}:${process.env.APP_PORT}`)
})
