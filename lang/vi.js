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
}

export const tranSuccess = {
    userCreated: (userEmail) => {
        return `Tài khoản <strong>${userEmail}</strong> đã được tạo, vui lòng kiểm tra email của bạn để active tài khoản. Xin cám ơn !`
    }
}
