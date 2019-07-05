import Usermodel from "./../models/userModel"

/**
 * update user info
 * @param {userid} id 
 * @param {userItem} item 
 */
let updateUser = (id, item) =>{
    return Usermodel.updateUser(id, item)
}

module.exports = {
    updateUser: updateUser
}
