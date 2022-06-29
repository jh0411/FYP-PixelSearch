const jwt = require('jsonwebtoken');

var authMethods = {
    authorizeToken: function (address, userPrivKey) {
        var signedToken = jwt.sign(address, userPrivKey, {
            issuer: "PixelSearch",
            subject: "FYP202204",
            expiresIn: 600,
            //algorithm: 'RS256'
        })

        console.log("User is connected", JSON.stringify({ address, token: signedToken, auth: true }));
        return signedToken
    },

    verifyToken: function (token, userPubKey) {
        var verifiedToken = jwt.verify(token, userPubKey, {
            issuer: "PixelSearch",
            subject: "FYP202204",
            expiresIn: 600,
            //algorithms: ['RS256']
        })

        return verifiedToken
    }
}
export default authMethods;
