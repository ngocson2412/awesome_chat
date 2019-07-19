function removeRequestContactSent(){
    $(".user-remove-request-contact-sent").unbind("click").on("click", function() {
        let tarGetId = $(this).data("uid")
        $.ajax({
            url: "/contact/remove-resquest-contact-sent",
            type: "delete",
            data: {uid:tarGetId},
            success: function(data){
                if(data.success) {
                    $("#find-user").find(`div.user-remove-request-contact-sent[data-uid = ${tarGetId}]`).hide()
                    $("#find-user").find(`div.user-add-new-contact[data-uid = ${tarGetId}]`).css("display","inline-block")
                    decreaseNumberNotiContact("count-request-contact-sent")
                    // xóa ở modal tab trang chờ xác nhận
                    $("#request-contact-sent").find(`li[data-uid = ${tarGetId}]`).remove()
                    socket.emit("remove-request-contact-sent", {contactId: tarGetId})
                }
            }
        })
    })
}

socket.on("response-remove-request-contact-sent", function(user){
    $(".noti_content").find(`div[data-uid = ${user.id}]`).remove() //popup notification
    $("ul.list-notifications").find(`li>div[data-uid = ${user.id}]`).parent().remove() //modal notifiction

    // xóa ở modal tab ở yêu cầu kết bạn
    $("#request-contact-received").find(`li[data-uid = ${user.id}]`).remove()
    decreaseNumberNotiContact("count-request-contact-received")

    decreaseNumberNotification("noti_contact_counter", 1)
    decreaseNumberNotification("noti_counter", 1)
})

$(document).ready(function() {
    removeRequestContactSent()
})
