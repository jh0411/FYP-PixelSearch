const jwt = require('jsonwebtoken');

var authMethods = {
    authorizeToken: function (address, secretPassphrase) {
        var signedToken = jwt.sign(address, secretPassphrase, {
            expiresIn: 300,
        })

        console.log("User is connected", JSON.stringify({ address, token: signedToken, auth: true }));
        return signedToken
    },

    verifyToken: function (token, secretPassphrase) {
        var verifiedToken = jwt.verify(token, secretPassphrase, {
            expiresIn: 300,
        })

        return verifiedToken
    }
}
export default authMethods;
