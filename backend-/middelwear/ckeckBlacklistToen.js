const { gettoken } = require('./Blacklisting')

function checktoken() {
    const token = req.headers.authorization.split(" ")[1];
    gettoken(token, (isBlacklisted) => {
        if (isBlacklisted) {
            res.send("You are Blocked")
        } else {
            next()
        }
    })
}