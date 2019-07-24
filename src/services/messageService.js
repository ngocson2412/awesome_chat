import ContactModel from "./../models/contactModel"
import UserModel from "./../models/userModel"
import chatGroupModel from "./../models/chatGroupModel"
import _ from "lodash"

const LIMIT_CONVERSTATIONS_TAKEN = 15
/**
 * get all conversations
 * @param {string} currentUserId
 */
let getAllConversationItems = (currentUserId) => {
    return new Promise(async (resole, reject) => {
        try {
            let contacts = await ContactModel.getContacts(currentUserId, LIMIT_CONVERSTATIONS_TAKEN)

            let userConversationsPromise = contacts.map(async (contact) => {
                if(contact.contactId == currentUserId) {
                    let getUserContact =  await UserModel.getNormalUserDataById(contact.userId)
                    getUserContact.updatedAt = contact.updatedAt
                    return getUserContact
                }else {
                    let getUserContact = await UserModel.getNormalUserDataById(contact.contactId)
                    getUserContact.updatedAt = contact.updatedAt
                    return getUserContact
                }                
            })

            let userConversations = await Promise.all(userConversationsPromise)
            let groupConversations = await chatGroupModel.getChatGroups(currentUserId, LIMIT_CONVERSTATIONS_TAKEN)
            let allConversations = userConversations.concat(groupConversations)
            
            allConversations = _.sortBy(allConversations,(item) => {
                return -item.updatedAt
            })
            console.log(allConversations)
            resole({
                userConversations: userConversations,
                groupConversations: groupConversations,
                allConversations: allConversations
            })
        } catch (error) {
            reject(error)
        }
    })
}

module.exports = {
    getAllConversationItems: getAllConversationItems
}
