import NotificationModel from "./../models/notificationModel"
import UserModel from "./../models/userModel"
/**
 * Get notifications when f5 page
 * just 10 item one time
 * @param {string} currentUserId 
 * @param {number} limit 
 */
let getNotifications = (currentUserId, limit = 10) => {
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

module.exports = {
    getNotifications: getNotifications
}
