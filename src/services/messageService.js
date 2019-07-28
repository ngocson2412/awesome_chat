import ContactModel from "./../models/contactModel"
import UserModel from "./../models/userModel"
import ChatGroupModel from "./../models/chatGroupModel"
import MessageModel from "./../models/messageModel"
import _ from "lodash"

const LIMIT_CONVERSTATIONS_TAKEN = 15
const LIMIT_MESSAGE_TAKEN = 30
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
            let groupConversations = await ChatGroupModel.getChatGroups(currentUserId, LIMIT_CONVERSTATIONS_TAKEN)
            let allConversations = userConversations.concat(groupConversations)
            
            allConversations = _.sortBy(allConversations,(item) => {
                return -item.updatedAt
            })
            // get messages to apply in screen chat
            let test = await MessageModel.model.getMessages("5d1a1bf13e849d080a8d43f9", "5d386536281c98058383896a", LIMIT_MESSAGE_TAKEN)

            let allConversationWithMessagePromise = allConversations.map( async (conversation) => {
                let getMessage = await MessageModel.model.getMessages(currentUserId, conversation._id, LIMIT_MESSAGE_TAKEN)
                
                conversation = conversation.toObject()
                conversation.messages = getMessage
                return conversation;
            })
            // sort by updateAt desending
            let allConversationWithMessage = await Promise.all(allConversationWithMessagePromise)
            allConversationWithMessage = _.sortBy(allConversationWithMessage,(item) => {
                return -item.updatedAt
            })

            resole({
                userConversations: userConversations,
                groupConversations: groupConversations,
                allConversations: allConversations,
                allConversationWithMessage: allConversationWithMessage
            })
        } catch (error) {
            reject(error)
        }
    })
}

module.exports = {
    getAllConversationItems: getAllConversationItems
}
