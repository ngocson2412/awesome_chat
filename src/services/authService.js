import UserModel from "./../models/userModel"
import bcrypt from "bcrypt"
import uuid4 from "uuid/v4"
import { rejects } from "assert";
import {transErrors} from "./../../lang/vi"
import {tranSuccess, transMail} from "./../../lang/vi"
import sendMail from "./../config/mailer"

let saltRounds = 7

let register = (email, gender, password, protocol, host) => {
    return new Promise(async (resolve, reject) => {
        let userByEmail = await UserModel.findByEmail(email)
        if(userByEmail) {
            if(userByEmail.deletedAt != null){
                return reject(transErrors.account_removed);
            }
            if(!userByEmail.local.isActive){
                return reject(transErrors.account_not_active);
            }
            return reject(transErrors.account_in_use);
        }
        let salt = bcrypt.genSaltSync(saltRounds)
        let userItem = {
            username: email.split("@")[0],
            gender: gender,
            local: {
                email: email,
                password: bcrypt.hashSync(password, salt),
                verifyToken: uuid4()
            }
        }
    
        let user = await UserModel.createNew(userItem)
        let linkVerify = `${protocol}://${host}/verify/${user.local.verifyToken}`
        //send email
        sendMail(email, transMail.subject, transMail.template(linkVerify))
            .then(success => {
                resolve(tranSuccess.userCreated(user.local.email))
            })
            .catch(async (error) => {
                //revmove user
                await UserModel.removeById(user._id)
                console.log(error)
                reject(transMail.send_failed)
            })
    }) 
}

let verifyAccount = (token) => {
    return new Promise( async (resolve, reject) => {
        let userByToken = await UserModel.findByToken(token)

        if(!userByToken) {
            return reject(transErrors.token_undefined)
        }
        await UserModel.verify(token)
        resolve(tranSuccess.account_actived)
    })
}

module.exports = {
    register: register,
    verifyAccount: verifyAccount
}
