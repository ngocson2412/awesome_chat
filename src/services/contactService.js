import ContactModel from "./../models/contactModel"
import UserModel from "./../models/userModel"
import NotificationModel from "./../models/notificationModel"
import _ from "lodash"
import {transErrors} from "./../../lang/vi"

const LIMIT_NUMBER_TAKEN = 1

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
            type: NotificationModel.types.ADD_CONTACT,
        }
        await NotificationModel.model.createNew(notificationItem)

        resolve(newContact)
    })
}

let removeRequestContactSent = (currentUserId, contactId) => {
    return new Promise(async (resolve,rejects) => {
        let removeReq = await ContactModel.removeRequestContactSent(currentUserId, contactId)
        if(removeReq.result.n === 0){
            return rejects(false)
        }
        // remove notìication
        let notifTypeAddContact = NotificationModel.types.ADD_CONTACT
        await NotificationModel.model.removeRequestContactSentNotification(currentUserId, contactId, notifTypeAddContact)

        resolve(true)
    })
}

let removeRequestContactReceived = (currentUserId, contactId) => {
    return new Promise(async (resolve,rejects) => {
        let removeReq = await ContactModel.removeRequestContactReceived(currentUserId, contactId)
        if(removeReq.result.n === 0){
            return rejects(false)
        }
        // remove notìication
        // let notifTypeAddContact = NotificationModel.types.ADD_CONTACT
        // await NotificationModel.model.removeRequestContactReceivedNotification(currentUserId, contactId, notifTypeAddContact)

        resolve(true)
    })
}

let approveRequestContactReceived = (currentUserId, contactId) => {
    return new Promise(async (resolve,rejects) => {
        let approveReq = await ContactModel.approveRequestContactReceived(currentUserId, contactId)
        if(approveReq.nModified === 0){
            return rejects(false)
        }
        // create notfication
        let notificationItem = {
            senderId: currentUserId,
            receiverId: contactId,
            type: NotificationModel.types.APPROVE_CONTACT,
        }
        await NotificationModel.model.createNew(notificationItem)

        resolve(true)
    })
}

let getContacts = (currentUserId) => {
    return new Promise(async (resolve,reject) => {
        try {
            let contacts = await ContactModel.getContacts(currentUserId, LIMIT_NUMBER_TAKEN)

            let users = contacts.map(async (contact) => {
                if(contact.contactId == currentUserId) {
                    return await UserModel.getNormalUserDataById(contact.userId)
                }else {
                    return await UserModel.getNormalUserDataById(contact.contactId)
                }                
            })
            
            resolve(await Promise.all(users))
        } catch (error) {
            reject(error)
        }
    })
}

let getContactsSent = (currentUserId) => {
    return new Promise(async (resolve,reject) => {
        try {
            let contacts = await ContactModel.getContactsSent(currentUserId, LIMIT_NUMBER_TAKEN)

            let users = contacts.map(async (contact) => {
                return await UserModel.getNormalUserDataById(contact.contactId)
            })
            
            resolve(await Promise.all(users))
        } catch (error) {
            reject(error)
        }
    })
}

let getContactsReceived = (currentUserId) => {
    return new Promise(async (resolve,reject) => {
        try {
            let contacts = await ContactModel.getContactsReceived(currentUserId, LIMIT_NUMBER_TAKEN)

            let users = contacts.map(async (contact) => {
                return await UserModel.getNormalUserDataById(contact.userId)
            })
            
            resolve(await Promise.all(users))
        } catch (error) {
            reject(error)
        }
    })
}

let countAllContacts = (currentUserId) => {
    return new Promise(async (resolve,reject) => {
        try {
            let count = await ContactModel.countAllContacts(currentUserId)
            
            resolve(count)
        } catch (error) {
            reject(error)
        }
    })
}

let countAllContactsSent = (currentUserId) => {
    return new Promise(async (resolve,reject) => {
        try {
            let count = await ContactModel.countAllContactsSent(currentUserId)
            
            resolve(count)
        } catch (error) {
            reject(error)
        }
    })
}

let countAllContactsReceived = (currentUserId) => {
    return new Promise(async (resolve,reject) => {
        try {
            let count = await ContactModel.countAllContactsReceived(currentUserId)
            
            resolve(count)
        } catch (error) {
            reject(error)
        }
    })
}

/**
 * Read more contact , max 10 items
 * @param {string} currentUserId 
 * @param {number} skipNumberContact
 */
let readMoreContacts = (currentUserId, skipNumberContact) => {
    return new Promise(async(resolve, reject) => {
        try {
            let newContacts = await ContactModel.readMoreContacts(currentUserId, skipNumberContact, LIMIT_NUMBER_TAKEN)
            
            let users = newContacts.map(async (contact) => {
                if(contact.contactId == currentUserId) {
                    return await UserModel.getNormalUserDataById(contact.userId)
                }else {
                    return await UserModel.getNormalUserDataById(contact.contactId)
                }
            })

            resolve(await Promise.all(users))
        } catch (error) {
            reject(error)
        }
    })
}

/**
 * Read more Contact sent , max 10 items
 * @param {string} currentUserId 
 * @param {number} skipNumberContact
 */
let readMoreContactsSent = (currentUserId, skipNumberContact) => {
    return new Promise(async(resolve, reject) => {
        try {
            let newContacts = await ContactModel.readMoreContactsSent(currentUserId, skipNumberContact, LIMIT_NUMBER_TAKEN)
            
            let users = newContacts.map(async (contact) => {
                return await UserModel.getNormalUserDataById(contact.contactId)
            })

            resolve(await Promise.all(users))
        } catch (error) {
            reject(error)
        }
    })
}

/**
 * Read more Contact sent , max 10 items
 * @param {string} currentUserId 
 * @param {number} skipNumberContact
 */
let readMoreContactsReceived = (currentUserId, skipNumberContact) => {
    return new Promise(async(resolve, reject) => {
        try {
            let newContacts = await ContactModel.readMoreContactsReceived(currentUserId, skipNumberContact, LIMIT_NUMBER_TAKEN)
            
            let users = newContacts.map(async (contact) => {
                return await UserModel.getNormalUserDataById(contact.userId)
            })

            resolve(await Promise.all(users))
        } catch (error) {
            reject(error)
        }
    })
}

module.exports = {
    findUsersContact: findUsersContact,
    addNew: addNew,
    removeRequestContactSent: removeRequestContactSent,
    removeRequestContactReceived: removeRequestContactReceived,
    approveRequestContactReceived: approveRequestContactReceived,
    getContacts: getContacts,
    getContactsSent: getContactsSent,
    getContactsReceived: getContactsReceived,
    countAllContacts: countAllContacts,
    countAllContactsSent: countAllContactsSent,
    countAllContactsReceived: countAllContactsReceived,
    readMoreContacts: readMoreContacts,
    readMoreContactsSent: readMoreContactsSent,
    readMoreContactsReceived: readMoreContactsReceived
}
