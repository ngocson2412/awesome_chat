import passport from "passport"
import passportGoogle from "passport-google-oauth"
import UserModel from "./../../models/userModel"
import {transErrors, tranSuccess} from "./../../../lang/vi"

let GoogleStrategy = passportGoogle.OAuth2Strategy

let ggAppId = process.env.GG_APP_ID
let ggAppSecret = process.env.GG_APP_SECRET
let ggCallbackUrl = process.env.GG_CALLBACK_URL
/**
 * Valid use account type: facebook
 */

let initPassportGoogle = () => {
    passport.use(new GoogleStrategy({
        clientID: ggAppId,
        clientSecret: ggAppSecret,
        callbackURL: ggCallbackUrl,
        passReqToCallback: true
    }, async (req, aceessToken, refreshToken, profile, done) => {
        try {
            let user = await UserModel.findByGgUid(profile.id)
            if(user) {
                return done(null, user, req.flash("success",tranSuccess.login_successfull(user.username)))
            }

            let newUserItem = {
                username: profile.displayName,
                gender: profile.gender,
                local: {
                    isActive: true
                },
                google: {
                    uid: profile.id,
                    token: aceessToken,
                    email: profile.emails[0].value
                }
            }
            let newUser = await UserModel.createNew(newUserItem)
            return done(null, newUser, req.flash("success",tranSuccess.login_successfull(newUser.username)))
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

module.exports = initPassportGoogle
