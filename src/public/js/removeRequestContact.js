function removeRequestContact(){
    $(".user-remove-request-contact").bind("click", function() {
        let tarGetId = $(this).data("uid")
        $.ajax({
            url: "/contact/remove-resquest-contact",
            type: "delete",
            data: {uid:tarGetId},
            success: function(data){
                if(data.success) {
                    $("#find-user").find(`div.user-remove-request-contact[data-uid = ${tarGetId}]`).hide()
                    $("#find-user").find(`div.user-add-new-contact[data-uid = ${tarGetId}]`).css("display","inline-block")
                    decreaseNumberNotiContact("count-request-contact-sent")
                    
                    socket.emit("remove-request-contact", {contactId: tarGetId})
                }
            }
        })
    })
}

socket.on("response-remove-request-contact", function(user){
    $(".noti_content").find(`div[data-uid = ${user.id}]`).remove() //popup notification
    $("ul.list-notifications").find(`li>div[data-uid = ${user.id}]`).parent().remove() //modal notifiction
    // xóa ở modal tab ở yêu cầu kết bạn

    decreaseNumberNotiContact("count-request-contact-received")

    decreaseNumberNotification("noti_contact_counter", 1)
    decreaseNumberNotification("noti_counter", 1)
})
