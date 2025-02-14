const jwt = require("jsonwebtoken");
const User = require("../model/User");
const JWTKEY = "wdwdjwdkwjdkwmdwmxiwmdiwhdwdiwjdiwjwedwrwdw";

const protect = async (req, res, next) => {
    const token = req.headers.authorization?.split(" ")[1];

    if (!token) {
        return res.status(401).json({ message: "Unauthorized: No token provided" });
    }

    try {
        const decoded = jwt.verify(token, JWTKEY);
        req.userId = decoded.userId
        next();
    } catch (error) {
        return res.status(401).json({ success: false, message: "Unauthorized: Invalid or expired token" });
    }
};

module.exports = protect;
