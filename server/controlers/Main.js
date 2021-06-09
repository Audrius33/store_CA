const usersDb = require('../schemas/UserSchema')
const bcrypt = require('bcrypt')
const saltRounds = 10

module.exports = {
    saveUser: async (req, res) => {

        const {
            userName,
            userEmail,
            userPsw1,
            userPsw2
        } = req.body

        let passwordHash

        bcrypt.genSalt(saltRounds, function (err, salt) {
            if (err) return next(err);

            bcrypt.hash(userPsw1, salt, function (err, hash) {
                passwordHash = hash
                if (err) return next(err);
                const users = new usersDb
                users.password1 = hash
                users.username = userName
                users.email = userEmail
                users.password1 = passwordHash
                users.password2 = userPsw2

                users.save().then(data => {
                    res.send({success: true})
                })
            })
        })


    },
    findUser: async (req, res) => {

        const {
            userLogin,
            userPswLogin
        } = req.body

        let passwordHash

        console.log(req.body)

        bcrypt.genSalt(saltRounds, function (err, salt) {
            if (err) return next(err)

            bcrypt.hash(userPswLogin, salt, async function (err, hash) {
                passwordHash = hash
                const users = new usersDb
                const findUser = await usersDb.findOne({email: userLogin})
                console.log(findUser)
                if (err) return next(err);
                bcrypt.compare(userPswLogin, findUser.password1, function (err, resSend) {
                    if (resSend) {
                        res.send({success: true})
                    } else {
                        res.send({success: false})
                    }
                });
            })
        })


    }
}