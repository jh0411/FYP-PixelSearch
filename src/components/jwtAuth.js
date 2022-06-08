const jwt = require('jsonwebtoken');

var authMethods = {
    authorizeToken: function (address, privateKey) {
        var signedToken = jwt.sign(address, privateKey, {
            expiresIn: 300,
        })

        console.log("User is connected", JSON.stringify({ address, token: signedToken, auth: true }));
        return signedToken
    },

    verifyToken: function (token, publicKey) {
        var verifiedToken = jwt.verify(token, publicKey, {
            expiresIn: 300,
        })

        return verifiedToken
    }
}
export default authMethods;
