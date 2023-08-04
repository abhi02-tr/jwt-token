const jwt = require("jsonwebtoken");

const verifyToken = async (req, res, next) => {
    try {
        const token = req.body.token || req.query.token || req.headers["x-access-token"];

        if(!token) {
            return res.status(403).json({message: "Token is required."});
        }

        const decoded = await jwt.verify(token, process.env.TOKEN_KEY);

        req.user = decoded;
        console.log(decoded);

    } catch(err) {
        console.log("error in auth.");
        console.error(err);
        return res.status(401).json({message: "Invalid Token."});
    }

    return next();
};

module.exports = verifyToken;