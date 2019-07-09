import ContactModel from "./../models/contactModel"
import UserModel from "./../models/userModel"
import _ from "lodash"
import {transErrors} from "./../../lang/vi"

let findUsersContact = (currentUserId, keyword) => {
    return new Promise(async (resolve,rejects) => {
        let deprecatedUserIds = []
        let contactsByUser = await ContactModel.findAllByUer(currentUserId)
        contactsByUser.forEach((contact) => {
            deprecatedUserIds.push(contact.userId)
            deprecatedUserIds.push(contact.contactId)
        })
        deprecatedUserIds = _.uniqBy(deprecatedUserIds)

        let users = await UserModel.findAllForAddContact(deprecatedUserIds,keyword)
        resolve(users)
    })
}
module.exports = {
    findUsersContact: findUsersContact
}
