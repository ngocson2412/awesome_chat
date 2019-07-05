export const transValidation = {
    email_incorrect: "Email phải có dạng example@gmail.com !",
    gender_incorrect: "Giới tính bị sao?",
    password_incorrect: "Mật khẩu phải chứa ít nhất 8 ký tự, bao gồm chữ hoa, chữ thường, chữ số và ký tự đặc biệt !",
    password_confirmation_incorrect: "Nhập lại mật khẩu không đúng !"
}

export const transErrors = {
    account_in_use: "Email này đã được sử dụng.",
    account_removed: "Tài khoản này đã bị gỡ khỏi hệ thống, nếu tin rằng điều này là hiểu nhầm , vui lòng liên hệ với bộ phận hỗ trợ của chúng tôi.",
    account_not_active: "Tài khoản này đã được đăng kí nhưng chưa được active , vui lòng kiểm tra email của bạn hoặc liên hệ với bộ phận hỗ trợ của chúng tôi.",
    token_undefined: "Token không tồn tại!",
    login_failed: "Tài khoản hoặc mật khẩu bị sai!",
    server_error: "Có lỗi ở phía sever, vui lòng liên hệ với bộ phận hỗ trợ để báo cáo lỗi này. Xin cám ơn!",
    avatar_type_error: "Kiểu file không hợp lệ, chỉ chấp nhận jpg & png.",
    avatar_size_error: "Ảnh upload tối đa cho phép là 1MB"
}

export const tranSuccess = {
    userCreated: (userEmail) => {
        return `Tài khoản <strong>${userEmail}</strong> đã được tạo, vui lòng kiểm tra email của bạn để active tài khoản. Xin cám ơn !`
    },
    account_actived: "Kích hoạt tài khoản thành công, bạn đã có thể đăng nhập vào ứng dụng.",
    login_successfull: (userName) => {
        return `Xin chào ${userName}, chúc bạn một ngày tốt lành.`
    },
    logout_successfull: "Đăng xuất tài khoản thành công !",
    avatar_update: "Cập nhật ảnh đại diện thành công!"
}

export const transMail = {
    subject: "Awesome chat: Xác nhận kích hoạt tài khoản",
    template: (linkVerify) => {
        return `
            <h2>Bạn nhận được email này vì đã đăng kí tài khoản trên ứng dụng Awesome Chat.</h2>
            <h3>Vui lòng kích vào liên kết bên dưới để xác nhận kích hoạt tài khoản.</h3>
            <h3><a href="${linkVerify}" target="blank">${linkVerify}</a></h3>
            <h4>Nếu tin rằng email này là nhầm lẫn, thì hãy bỏ qua nó. Cám ơn !</h4>
        `
    },
    send_failed: "Có lỗi trong quá trình gửi email, vui lòng liên hệ lại với bộ phận hỗ trợ của chúng tôi."
}
