function removeRequestContactReceived(){
    $(".user-remove-request-contact-received").unbind("click").on("click", function() {
        let tarGetId = $(this).data("uid")
        
        $.ajax({
            url: "/contact/remove-resquest-contact-received",
            type: "delete",
            data: {uid:tarGetId},
            success: function(data){
                if(data.success) {
                    //chua muon lam
                    //$(".noti_content").find(`div[data-uid = ${user.id}]`).remove() //popup notification
                    //$("ul.list-notifications").find(`li>div[data-uid = ${user.id}]`).parent().remove() //modal notifiction
                    //decreaseNumberNotification("noti_counter", 1)

                    decreaseNumberNotiContact("count-request-contact-received")
                    decreaseNumberNotification("noti_contact_counter", 1)
                    
                    // xóa ở modal tab ở yêu cầu kết bạn
                    $("#request-contact-received").find(`li[data-uid = ${tarGetId}]`).remove()
                    
                    socket.emit("remove-request-contact-received", {contactId: tarGetId})
                }
            }
        })
    })
}

socket.on("response-remove-request-contact-received", function(user){
    $("#find-user").find(`div.user-remove-request-contact-sent[data-uid = ${user.id}]`).hide()
    $("#find-user").find(`div.user-add-new-contact[data-uid = ${user.id}]`).css("display","inline-block")

    // xóa ở modal tab trang chờ xác nhận
    $("#request-contact-sent").find(`li[data-uid = ${user.id}]`).remove()
    decreaseNumberNotiContact("count-request-contact-sent")

    decreaseNumberNotification("noti_contact_counter", 1)
})

$(document).ready(function() {
    removeRequestContactReceived()
})
