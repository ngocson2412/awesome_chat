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
                let sender = await UserModel.getNormalUserDataById(notification.senderId)
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
 * @param {number} skipNumberNotif
 */
let readMore = (currentUserId, skipNumberNotif) => {
    return new Promise(async(resolve, reject) => {
        try {
            let notifications = await NotificationModel.model.readMore(currentUserId, skipNumberNotif, LIMIT_NUMBER_TAKEN)

            let getNotiContents = notifications.map(async (notification) => {
                let sender = await UserModel.getNormalUserDataById(notification.senderId)
                return NotificationModel.contents.getContent(notification.type, notification.isRead, sender._id, sender.username, sender.avatar)
            })

            resolve(await Promise.all(getNotiContents))
        } catch (error) {
            reject(error)
        }
    })
}

/**
 * Mark all as notification 
 * @param {string} currentUserId 
 * @param {Array} targetUsers
 */
let markAllAsRead = (currentUserId, targetUsers) => {
    return new Promise(async(resolve, reject) => {
        try {
            await NotificationModel.model.markAllAsRead(currentUserId, targetUsers)
            resolve(true)
        } catch (error) {
            console.log(`Error when mark notifications as read: ${error}`)
            reject(false)
        }
    })
}

module.exports = {
    getNotifications: getNotifications,
    countNotifUnread: countNotifUnread,
    readMore: readMore,
    markAllAsRead: markAllAsRead
}
