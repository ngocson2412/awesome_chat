function removeContact(){
    $(".user-remove-contact").unbind("click").on("click", function() {
        let tarGetId = $(this).data("uid")
        let userName = $(this).parent().find("div.user-name p").text()
        Swal.fire({
            title: `Bạn có chắc chắn muốn xoá ${userName} khỏi danh bạ?`,
            text: "Bạn không thể hoàn tác lại quá trình này!",
            type: "warning",
            showCancelButton: true,
            confirmButtonColor: "#2ECC71",
            cancelButtonColor: "#ff7685",
            confirmButtonText: "Xác nhận!",
            cancelButtonText: "Hủy"
        }).then((result) => {
            if (!result.value) {
                return false
            }
            $.ajax({
                url: "/contact/remove-contact",
                type: "delete",
                data: {uid:tarGetId},
                success: function(data){
                    if(data.success) {
                        $("#contacts").find(`ul li[data-uid = ${tarGetId}]`).remove()
                        decreaseNumberNotiContact("count-contacts") // js/caculateNotifContact.js
                        // sau này làm chức năng chat thì sẽ làm tiếp
                        socket.emit("remove-contact", {contactId: tarGetId})
                    }
                }
            })
        })
    })
}

socket.on("response-remove-contact", function(user){
    $("#contacts").find(`ul li[data-uid = ${user.id}]`).remove()
    decreaseNumberNotiContact("count-contacts") // js/caculateNotifContact.js
})

$(document).ready(function() {
    removeContact()
})
