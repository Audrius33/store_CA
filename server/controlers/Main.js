const usersDb = require('../schemas/UserSchema')
const itemDb = require('../schemas/ItemSchema')
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
                        res.send({success: true, email: userLogin})
                    } else {
                        res.send({success: false})
                    }
                });
            })
        })


    },

    itemValue: async (req, res) => {
        const {
            item,
            loginEmail,
        } = req.body

        const items = new itemDb
        items.item = item
        items.clientEmail = loginEmail
        const findItem = await itemDb.find({clientEmail: loginEmail})
        // console.log(findItem[0]._id)

        items.save().then(async data => {
            // const findAll = await itemDb.find()
            // res.send({success: true, findAll, item, itemValue: findItem[0]._id})

            res.send({success: true, findItem})

        })
    },
    getClientList: async (req, res) => {
        const {
            loginEmail,
        } = req.body

        const findItems = await itemDb.find({clientEmail: loginEmail})
        res.send({findItems})
    },
    removeItem: async (req, res) => {
        await itemDb.findOneAndDelete({_id: req.params.id})
        let allItems = await itemDb.find()
        res.send({success: true, allItems, message: "item was deleted"})
    },
    updateItem: async (req, res) => {
        console.log(req.body)
        const {clientInfo, newValue} = req.body

        await itemDb.findOneAndUpdate({_id: clientInfo._id}, {$set: {item: newValue}})
        let oneItem = await itemDb.find()
        res.send({success: true, oneItem})
    }

}