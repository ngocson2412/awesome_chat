import NotificationModel from "./../models/notificationModel"
import UserModel from "./../models/userModel"

const LIMIT_NUMBER_TAKEN = 10
/**
 * Get notifications when f5 page
 * just 10 item one time
 * @param {string} currentUserId 
 * @param {number} limit 
 */
let getNotifications = (currentUserId, limit = LIMIT_NUMBER_TAKEN) => {
    return new Promise(async(resolve, reject) => {
        try {
            let notifications = await NotificationModel.model.getByUserIdAndLimit(currentUserId,limit)

            let getNotiContents = notifications.map(async (notification) => {
                let sender = await UserModel.findUserById(notification.senderId)
                return NotificationModel.contents.getContent(notification.type, notification.isRead, sender._id, sender.username, sender.avatar)
            })

            resolve(await Promise.all(getNotiContents))
        } catch (error) {
            reject(error)
        }
    })
}

/**
 * Get all notifications unread
 * @param {string} currentUserId 
 */
let countNotifUnread = (currentUserId) => {
    return new Promise(async(resolve, reject) => {
        try {
            let notificationsUnread = await NotificationModel.model.countNotifUnread(currentUserId)
            resolve(notificationsUnread)
        } catch (error) {
            reject(error)
        }
    })
}
/**
 * Read more notification , max 10 items
 * @param {string} currentUserId 
 * @param {number} currentUserId
 */
let readMore = (currentUserId, skipNumberNotif) => {
    return new Promise(async(resolve, reject) => {
        try {
            let notifications = await NotificationModel.model.readMore(currentUserId, skipNumberNotif, LIMIT_NUMBER_TAKEN)

            let getNotiContents = notifications.map(async (notification) => {
                let sender = await UserModel.findUserById(notification.senderId)
                return NotificationModel.contents.getContent(notification.type, notification.isRead, sender._id, sender.username, sender.avatar)
            })

            resolve(await Promise.all(getNotiContents))
        } catch (error) {
            reject(error)
        }
    })
}

module.exports = {
    getNotifications: getNotifications,
    countNotifUnread: countNotifUnread,
    readMore: readMore
}
