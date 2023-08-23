const jwt = require("jsonwebtoken");

const verifyToken = (req, res, next) => {
    const token = req.cookies.access_token;
    if (!token) {
        res.status(401).send('You are not authenticated!');
        return;
    }
    jwt.verify(token, process.env.JWT_TOKEN, (err, user) => {
        if (err) {
            res.status(403).send("Token is not valid");
            return;
        }
        req.user = user;
        next();
    })
}

const verifyUser = (req, res, next) => {
    verifyToken(req, res, next, () => {
        if (req.user.id == req.params.id || req.user.isAdmin) {
            next();
        } else {
            res.status(403).send("You are not authorized");
            return;
        }
    })
}

const verifyAdmin = (req, res, next) => {
    verifyToken(req, res, next, () => {
        if (req.user.isAdmin) {
            next();
        } else {
            res.status(403).send("You are not authorized");
            return;
        }
    })
}

module.exports = { verifyUser, verifyToken, verifyAdmin };