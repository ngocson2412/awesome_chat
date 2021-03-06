import {validationResult} from "express-validator/check"
import {auth} from "./../services/index"
import {tranSuccess} from "./../../lang/vi"

let getLogin = (req, res) => {
    return res.render("auth/master", {
        errors:req.flash("errors"),
        success:req.flash("success"),
    })
}

let getLogout = (req, res) => {
    req.logout() // remove session passport user
    req.flash("success",tranSuccess.logout_successfull)
    return res.redirect("/login")
}

let postRegister = async (req, res) => {
    let errorArr = []
    let successArr = []

    let validationErrors = validationResult(req)
    if(!validationErrors.isEmpty()) {
        let errors = Object.values(validationErrors.mapped())
        errors.forEach(item => {
            errorArr.push(item.msg)
        })
        req.flash("errors", errorArr)
        return res.redirect("/login")
    }
    try {
        let createUserSuccess = await auth.register(req.body.email, req.body.gender, req.body.password, req.protocol, req.get("host"))
        successArr.push(createUserSuccess)
        req.flash("success", successArr)
        return res.redirect("/login")
    } catch (error) {
        errorArr.push(error)
        req.flash("errors", errorArr)
        return res.redirect("/login")
    }
}

let getVerify = async (req,res) => {
    let errorArr = []
    let successArr = []

    try {
        let verifySuccess = await auth.verifyAccount(req.params.token)
        successArr.push(verifySuccess)
        req.flash("success", successArr)
        return res.redirect("/login")
    } catch (error) {
        errorArr.push(error)
        req.flash("errors", errorArr)
        return res.redirect("/login")
    }
}

let checkLoggedIn = (req, res, next) => {
    if(!req.isAuthenticated()) {
        return res.redirect("/login")
    }
    next()
}

let checkLoggedOut = (req, res, next) => {
    if(req.isAuthenticated()) {
        return res.redirect("/")
    }
    next()
}

module.exports = {
    getLogin : getLogin,
    getLogout : getLogout,
    postRegister : postRegister,
    getVerify: getVerify,
    checkLoggedIn: checkLoggedIn,
    checkLoggedOut: checkLoggedOut
}
