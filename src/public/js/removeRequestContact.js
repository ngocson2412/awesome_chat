function decreaseNumberNotiContact(className) {
    let currentValue = +$(`.${className}`).find("em").text() // chuyen string sang number
    currentValue -=1

    if(currentValue === 0) {
        $(`.${className}`).html("")
    }else {
        $(`.${className}`).html(`(<em>${currentValue}</em>)`)
    }
}

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
                    // xử lý realtime ở bài sau
                }
            }
        })
    })
}
