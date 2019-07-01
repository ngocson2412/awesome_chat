import express from "express"
import {home, auth} from "./../controllers/index"
import {authValid} from "./../validation/index"

let router = express.Router()

/**
 * Init all routes
 * @param app from exactly express module
 */
let initRoutes = (app) => {
    router.get("/", home.getHome)
    router.get("/login", auth.getLogin)
    router.get("/logout", auth.getLogout)
    router.post("/register", authValid.register, auth.postRegister)
    router.get("/verify/:token",auth.getVerify)

    return app.use("/", router)
}

module.exports = initRoutes
