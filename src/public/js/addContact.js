function addContact() {
    $(".user-add-new-contact").bind("click", function() {
        let tarGetId = $(this).data("uid")
        $.post("/contact/add-new", {uid: tarGetId}, function(data) {
            if(data.success) {
                $("#find-user").find(`div.user-add-new-contact[data-uid = ${tarGetId}]`).hide()
                $("#find-user").find(`div.user-remove-request-contact[data-uid = ${tarGetId}]`).css("display","inline-block")
                increaseNumberNotiContact("count-request-contact-sent")
                socket.emit("add-new-contact", {contactId: tarGetId})
            }
        })
    })
}

socket.on("response-add-new-contact", function(user){
    let notif = `<div class="notif-readed-false" data-uid="${ user.id }">
        <img class="avatar-small" src="images/users/${ user.avatar }" alt=""> 
        <strong>${ user.username }</strong> đã gửi cho bạn một lời mời kết bạn!
        </div>`

    $(".noti_content").prepend(notif) //popup notification
    $("ul.list-notifications").prepend(`<li>${notif}</li>`) //modal notification

    increaseNumberNotiContact("count-request-contact-received")

    increaseNumberNotification("noti_contact_counter")
    increaseNumberNotification("noti_counter")
})