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
