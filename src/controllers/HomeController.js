import {notification} from "./../services/index"

let getHome = async(req, res) => {
    let notifications = {}
    let countNotifUnread = 0
    try {
        //get only 100 items one time
        notifications = await notification.getNotifications(req.user._id)
        //get amount notifications unread
        countNotifUnread = await notification.countNotifUnread(req.user._id)
    } catch (error) {
        console.log(error)
    }
    return res.render("main/home/home", {
        errors:req.flash("errors"),
        success:req.flash("success"),
        user: req.user,
        notifications: notifications,
        countNotifUnread: countNotifUnread
    })
}

module.exports = {
    getHome: getHome
}
