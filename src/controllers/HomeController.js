import {notification, contact, message} from "./../services/index"
import {bufferToBase64} from "./../helpers/clientHelper"

let getHome = async(req, res) => {
    //get only 100 items one time
    let notifications = await notification.getNotifications(req.user._id)
    //get amount notifications unread
    let countNotifUnread = await notification.countNotifUnread(req.user._id)

    //get contacts (10 item one time)
    let contacts = await contact.getContacts(req.user._id)
    //get contacts sent(10 item one time)
    let contactsSent = await contact.getContactsSent(req.user._id)
    //get contacts received (10 item one time)
    let contactsReceived = await contact.getContactsReceived(req.user._id)

    //count contacts
    let countAllContacts = await contact.countAllContacts(req.user._id)
    let countAllContactsSent = await contact.countAllContactsSent(req.user._id)  
    let countAllContactsReceived = await contact.countAllContactsReceived(req.user._id)

    // get All Conversation items
    let getAllConversationItems = await message.getAllConversationItems(req.user._id)
    let allConversations = getAllConversationItems.allConversations
    let userConversations = getAllConversationItems.userConversations
    let groupConversations = getAllConversationItems.groupConversations

    //get all messages with conversations , max 30 item
    let allConversationWithMessage = getAllConversationItems.allConversationWithMessage
    
    return res.render("main/home/home", {
        errors:req.flash("errors"),
        success:req.flash("success"),
        user: req.user,
        notifications: notifications,
        countNotifUnread: countNotifUnread,
        contacts: contacts,
        contactsSent: contactsSent,
        contactsReceived: contactsReceived,
        countAllContacts: countAllContacts,
        countAllContactsSent: countAllContactsSent,
        countAllContactsReceived: countAllContactsReceived,
        allConversations: allConversations,
        userConversations: userConversations,
        groupConversations: groupConversations,
        allConversationWithMessage: allConversationWithMessage,
        bufferToBase64: bufferToBase64
    })
}

module.exports = {
    getHome: getHome
}
