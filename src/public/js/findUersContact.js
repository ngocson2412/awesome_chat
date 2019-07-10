function callFindUser(element) {
    if(element.which === 13 || element.type === "click") { // 13 sự kiện gõ nút enter
        let keyword = $("#input-find-users-contact").val()
        let regexKeyword = new RegExp(/^[\s0-9a-zA-Z_ÀÁÂÃÈÉÊÌÍÒÓÔÕÙÚĂĐĨŨƠàáâãèéêìíòóôõùúăđĩũơƯĂẠẢẤẦẨẪẬẮẰẲẴẶẸẺẼỀỀỂưăạảấầẩẫậắằẳẵặẹẻẽềềểỄỆỈỊỌỎỐỒỔỖỘỚỜỞỠỢỤỦỨỪễệỉịọỏốồổỗộớờởỡợụủứừỬỮỰỲỴÝỶỸửữựỳỵỷỹ ]+$/)

        if(!keyword.length) {
            alertify.notify("Chưa nhập nội dung tìm kiếm.", "error", 7)
            return false
        }
        if(!regexKeyword.test(keyword)){
            alertify.notify("Lỗi từ khóa tìm kiếm, chỉ cho phép kí tự chữ cái và số, cho phép khoảng trống.", "error", 7)
            return false
        }
        $.get(`/contact/find-users/${keyword}`, function(data){
            $("#find-user ul").html(data)
            addContact() // js/addContact.js
            removeRequestContact() // js/removeRequestContact.js
        })
    }
}
$(document).ready(function() {
    $("#input-find-users-contact").bind("keypress", callFindUser)
    $("#btn-find-users-contact").bind("click", callFindUser)
})
