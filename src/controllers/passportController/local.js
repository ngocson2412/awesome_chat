import passport from "passport"
import passportLocal from "passport-local"
import UserModel from "./../../models/userModel"
import {transErrors, tranSuccess} from "./../../../lang/vi"

let localStrategy = passportLocal.Strategy

/**
 * Valid use account type: local
 */

let initPassportLocal = () => {
    passport.use(new localStrategy({
        usernameField: "email",
        passwordField: "password",
        passReqToCallback: true
    }, async (req, email, password, done) => {
        try {
            let user = await UserModel.findByEmail(email)
            if(!user) {
                return done(null, false, req.flash("errors",transErrors.login_failed))
            }
            if(!user.local.isActive) {
                return done(null, false, req.flash("errors",transErrors.account_not_active))
            }
            let checkPassword = await user.comparePassword(password)

            if(!checkPassword) {
                return done(null, false, req.flash("errors",transErrors.login_failed))
            }
            return done(null, user, req.flash("success",tranSuccess.login_successfull(user.username)))
        } catch (error) {
            console.log(error)
            return done(null, false, req.flash("errors",transErrors.server_error))
        }
    }))

    // save userId to session
    passport.serializeUser((user, done) => {
        done(null, user._id)
    })

    //this is called by passport.session()
    //return userInfo to req.user
    passport.deserializeUser((id, done) => {
        UserModel.findUserById(id)
        .then(user => {
            return done(null, user)
        })
        .catch(error =>{
            return done(error, null)
        } )
    })
}

module.exports = initPassportLocal
