const symbols = "0123456789!@#$%^&*()_>?,.';ąčėįšųūž][\/*"


module.exports = {
    validateInput: async (req, res, next) => {
        console.log(req.body)
        const {
            item
        } = req.body
        function errorSend(error, message) {
            res.send({error: error, message: message})
        }
        if (item === "") {
            return errorSend(true, 'no value to be found')

        }
        if (item.length > 15 || item.length < 0) {
            return errorSend(true, 'product length is not valid')
        }
        for (let i = 0; i < symbols.length; i++) {
            if (item.includes(symbols[i])) {
                return errorSend(true, "Cant use symbols")
            }
        }

        next()
    }

}