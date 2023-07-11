const jwt = require("jsonwebtoken");
const privateKey = "DprDmx1Udpgd1jUSvQIDAQAB";
const expiresIn = "25000h";

const checkAuth = (req, res, next) => {
    try {
        req.userData = jwt.verify(req.headers.authorization.split(" ")[1], privateKey);     // new data field added to get user data from jwt key => _id and email
        next();
    }
    catch(error) {
        console.log("checkAuth not passed")
        return res.status(401).json({
            message: 'JWT check failed | please login first | unauthorized',
            error: error
        });
    }
};

function createJWT(_id, email) {
    return jwt.sign({ userid: _id, email }, privateKey, {expiresIn});
}

module.exports = {createJWT, checkAuth};