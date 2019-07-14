import ContactModel from "./../models/contactModel"
import UserModel from "./../models/userModel"
import NotificationModel from "./../models/notificationModel"
import _ from "lodash"
import {transErrors} from "./../../lang/vi"

let findUsersContact = (currentUserId, keyword) => {
    return new Promise(async (resolve,rejects) => {
        let deprecatedUserIds = [currentUserId]
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
let addNew = (currentUserId, contactId) => {
    return new Promise(async (resolve,rejects) => {
        let contactExists = await ContactModel.checkExists(currentUserId, contactId)
        if(contactExists) {
            return rejects(false)
        }
        //create contact
        let newContactItem = {
            userId: currentUserId,
            contactId:contactId
        }
        let newContact = await ContactModel.createNew(newContactItem)

        // create notification
        let notificationItem = {
            senderId: currentUserId,
            receiverId: contactId,
            type: NotificationModel.types,
        }
        await NotificationModel.model.createNew(notificationItem)

        resolve(newContact)
    })
}

let removeRequestContact = (currentUserId, contactId) => {
    return new Promise(async (resolve,rejects) => {
        let removeReq = await ContactModel.removeRequestContact(currentUserId, contactId)
        if(removeReq.result.n === 0){
            return rejects(false)
        }
        // remove notìication
        let notifTypeAddContact = NotificationModel.types
        await NotificationModel.model.removeRequestContactNotification(currentUserId, contactId, notifTypeAddContact)

        resolve(true)
    })
}

module.exports = {
    findUsersContact: findUsersContact,
    addNew: addNew,
    removeRequestContact: removeRequestContact
}
