let userAvatar = null
let userInfo = {}
let originAvatarSrc = null
let originUserInfo = {}

function updateUserInfo() {
    $("#input-change-avatar").bind("change", function() {
        let fileData = $(this).prop("files")[0]
        let math = ["image/png", "image/jpg", "image/jpeg"]
        let limit = 1048576 // byte = 1MB
        if($.inArray(fileData.type, math) === -1) {
            alertify.notify("Kiểu file không hợp lệ, chỉ chấp nhận jpg & png.", "error", 7)
            $(this).val(null)
            return false;
        }
        if(fileData.size > limit) {
            alertify.notify("Ảnh upload tối đa cho phép là 1MB", "error", 7)
            $(this).val(null)
            return false;
        }
        if (typeof (FileReader) != "undefined") {
            let imagePreview = $("#image-edit-profile");
            imagePreview.empty()
            let fileReader = new FileReader()
            fileReader.onload = function(element) {
                $("<img>", {
                    "src": element.target.result,
                    "class": "avatar img-circle",
                    "id": "user-modal-avatar",
                    "alt": "avatar",
                }).appendTo(imagePreview)
            }
            imagePreview.show()
            fileReader.readAsDataURL(fileData)

            let formData = new FormData()
            formData.append("avatar", fileData)

            userAvatar = formData
        } else {
            alertify.notify("Trình duyệt của bạn không hỗ trợ FileReader", "error", 7)
        }
    })
    $("#input-change-username").bind("change", function(){
        let username = $(this).val()
        let regexUserName = new RegExp("^[\s0-9a-zA-Z_ÀÁÂÃÈÉÊÌÍÒÓÔÕÙÚĂĐĨŨƠàáâãèéêìíòóôõùúăđĩũơƯĂẠẢẤẦẨẪẬẮẰẲẴẶẸẺẼỀỀỂưăạảấầẩẫậắằẳẵặẹẻẽềềểỄỆỈỊỌỎỐỒỔỖỘỚỜỞỠỢỤỦỨỪễệỉịọỏốồổỗộớờởỡợụủứừỬỮỰỲỴÝỶỸửữựỳỵỷỹ ]+$")
        
        if(!regexUserName.test(username) || username.length < 3 || username.length > 17) {
            alertify.notify("Username giới hạn trong khoảng 3-17 kí tự và không được phép chưa kí tự đặc biệt", "error", 7)
            $(this).val(originUserInfo.username)
            delete userInfo.userInfo
            return false
        }
        userInfo.username = username
    })
    $("#input-change-gender-male").bind("click", function(){
        let gender = $(this).val()
        if(gender !== "male") {
            alertify.notify("Dữ liệu giới tính có vấn đề !!!", "error", 7)
            $(this).val("male")
            delete userInfo.gender
            return false
        }
        userInfo.gender = gender
    })
    $("#input-change-gender-female").bind("click", function(){
        let gender = $(this).val()
        if(gender !== "female") {
            alertify.notify("Dữ liệu giới tính có vấn đề !!!", "error", 7)
            $(this).val("female")
            delete userInfo.gender
            return false
        }
        userInfo.gender = gender
    })
    $("#input-change-address").bind("change", function(){
        let address = $(this).val()
        if(address.length < 3 || address.length > 30) {
            alertify.notify("Địa chỉ giới hạn trong khoảng 3-30 kí tự", "error", 7)
            $(this).val(originUserInfo.address)
            delete userInfo.address
            return false
        }
        userInfo.address = address
    })
    $("#input-change-phone").bind("change", function(){
        let phone = $(this).val()
        let regexUserName = new RegExp("^(0)[0-9]{9,10}$")

        if(!regexUserName.test(phone)) {
            alertify.notify("Số điện thoại bắt đầu bằng số 0, giới hạn trong khoảng 10-11 kí tự", "error", 7)
            $(this).val(originUserInfo.phone)
            delete userInfo.phone
            return false
        }
        userInfo.phone = phone
    })
}
function callUpdateUserAvatar () {
    $.ajax({
        url: "/user/update-avatar",
        type: "put",
        cache: false,
        contentType: false,
        processData: false,
        data: userAvatar,
        success: function(result) {
            console.log(result)
            $(".user-modal-alert-success").find("span").text(result.message)
            $(".user-modal-alert-success").css("display", "block")

            //Update avatar navbar
            $("#navbar-avatar").attr("src", result.imageSrc)
            //update origin avatar.src
            originAvatarSrc = result.imageSrc
            $("#input-btn-cancel-update-user").click()
        },
        error: function(error) {
            $(".user-modal-alert-error").find("span").text(error.responseText)
            $(".user-modal-alert-error").css("display", "block")
            //reset all
            $("#input-btn-cancel-update-user").click()
        }
    })
}
function callUpdateUserinfo() {
    $.ajax({
        url: "/user/update-info",
        type: "put",
        data: userInfo,
        success: function(result) {
            console.log(result)
            $(".user-modal-alert-success").find("span").text(result.message)
            $(".user-modal-alert-success").css("display", "block")
            // update Origin user info    
            originUserInfo = Object.assign(originUserInfo,userInfo)
            
            //update user name at navbar
            $("#navbar-username").text(originUserInfo.username)

            //reset all    
            $("#input-btn-cancel-update-user").click()
        },
        error: function(error) {
            $(".user-modal-alert-error").find("span").text(error.responseText)
            $(".user-modal-alert-error").css("display", "block")
            //reset all
            $("#input-btn-cancel-update-user").click()
        }
    })
}
$(document).ready(function() {
    originAvatarSrc = $("#user-modal-avatar").attr("src")
    originUserInfo = {
        username: $("#input-change-username").val(),
        gender: ($("#input-change-gender-male").is(":checked")) ? $("#input-change-gender-male").val() : $("#input-change-gender-female").val(),
        address: $("#input-change-address").val(),
        phone: $("#input-change-phone").val()
    }
    //update userInfo after reset
    updateUserInfo()

    $("#input-btn-update-user").bind("click", function(){
        if ($.isEmptyObject(userInfo) && !userAvatar) {
            alertify.notify("Bạn phải thay đổi thông tin trước khi cập nhập dữ kiệu.", "error", 7)
            return false
        }
        if(userAvatar) {
            callUpdateUserAvatar()
        }
        if(!$.isEmptyObject(userInfo)) {
            callUpdateUserinfo()
        }
        // console.log(userAvatar, userInfo)
    })
    

    $("#input-btn-cancel-update-user").bind("click", function(){
        userAvatar = null
        userInfo = {}
        console.log(originUserInfo)
        $("#input-change-avatar").val(null)
        $("#user-modal-avatar").attr("src", originAvatarSrc)

        $("#input-change-username").val(originUserInfo.username)
        if(originUserInfo.gender === "male") {
            $("#input-change-gender-male").click()
        }else {
            $("#input-change-gender-female").click()
        }
        $("#input-change-address").val(originUserInfo.address)
        $("#input-change-phone").val(originUserInfo.phone)
    })
})
