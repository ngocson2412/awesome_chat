let getLogin = (req, res) => {
    return res.render("auth/master")
}

let getLogout = (req, res) => {
    // do something
}
module.exports = {
    getLogin : getLogin,
    getLogout : getLogout
}
