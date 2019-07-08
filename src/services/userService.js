import Usermodel from "./../models/userModel"
import {transErrors} from "./../../lang/vi"
import bcrypt from "bcrypt"

const saltRounds = 7
/**
 * update user info
 * @param {userid} id 
 * @param {userItem} item 
 */
let updateUser = (id, item) =>{
    return Usermodel.updateUser(id, item)
}
/**
 * update password info
 * @param {userid} id 
 * @param {userItem} dataUpdate 
 */
let updatePassword = (id, dataUpdate) =>{
    return new Promise(async (resolve, reject) => {
        let currentUser = await Usermodel.findUserById(id)
        if(!currentUser) {
            return reject(transErrors.account_underfined)
        }
        let checkCurrentPassword = await currentUser.comparePassword(dataUpdate.currentPassword)
        if(!checkCurrentPassword) {
            return reject(transErrors.user_current_password_failed)
        }

        let salt = bcrypt.genSaltSync(saltRounds)
        await Usermodel.updatePassword(id, bcrypt.hashSync(dataUpdate.newPassword, salt))
        resolve(true)
    })
}

module.exports = {
    updateUser: updateUser,
    updatePassword: updatePassword,
}
