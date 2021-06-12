const symbols = "!@#$%^&*()_>?,.';ąčėįšųūž][\/*"
const validator = require("email-validator");
const validPassword = new RegExp('^(?=.*?[A-Za-z])(?=.*?[0-9]).{6,}$');


module.exports = {
    validatingUser: async (req, res, next) => {

        const {
            userName,
            userEmail,
            userPsw1,
            userPsw2
        } = req.body

        function errorSend(error, message) {
            res.send({error: error, message: message})
        }

        if (userName.length > 100 || userName.length < 6) {
            return errorSend(true, 'username length is not valid')
        }
        if (!userEmail) {
            return errorSend(true, 'email is not valid')
        }

        for (let i = 0; i < symbols.length; i++) {
            if (userName.includes(symbols[i])) {
                return errorSend(true, "Cant use symbols")
            }
        }
        if (!validator.validate(userEmail)) {
            return errorSend(true, 'need to put @ or .com Example name.surname@gmail.com ')
        }
        if (!userPsw1) {
            return errorSend(true, 'password is not valid')
        }
        if (!userPsw2) {
            return errorSend(true, 'password 2 is not valid')
        }

        if (userPsw1.length < 8) {
            return errorSend(true, 'Password must be 8 characters long')
        }
        if (userPsw2.length < 8) {
            return errorSend(true, 'Second password must be 8 characters long')
        }
        if (!validPassword.test(userPsw1)) {
            return errorSend(true, 'password must contain at least 1 number')
        }
        if (!validPassword.test(userPsw2)) {
            return errorSend(true, 'second password must contain at least 1 number')
        }
        if (userPsw1 !== userPsw2) {
            return errorSend(true, 'passwords dont match')
        }
        next()
    }
}