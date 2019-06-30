import {validationResult} from "express-validator/check"

let getLogin = (req, res) => {
    return res.render("auth/master")
}

let getLogout = (req, res) => {
    // do something
}

let postRegister = (req, res) => {
    let errorArr = []

    let validationErrors = validationResult(req)
    if(!validationErrors.isEmpty()) {
        let errors = Object.values(validationErrors.mapped())
        errors.forEach(item => {
            errorArr.push(item.msg)
        })
        console.log(errorArr)
    }
    console.log(req.body)
    // console.log(req.body)
}
module.exports = {
    getLogin : getLogin,
    getLogout : getLogout,
    postRegister : postRegister,
}
