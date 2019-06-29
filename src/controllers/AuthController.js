let getLogin = (req, res) => {
    return res.render("auth/loginRegister")
}

let getLogout = (req, res) => {
    // do something
}
module.exports = {
    getLogin : getLogin,
    getLogout : getLogout
}
