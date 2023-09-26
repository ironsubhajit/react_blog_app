const JWT = require("jsonwebtoken");

module.exports = function (req, res, next) {
    // console.log(`Request Body-header-api -verify.js: ${JSON.stringify(req.headers)}`);
    const token = req.header("auth-token");
    // console.log(`verify token: ${token}`);
    if (!token) return res.status(401).send({message: "Access-Denied"});

    try{
        const verified = JWT.verify(token, process?.env?.SECRET_KEY);
        req?.user = verified;
        next();
    }catch(err){
        return res.status(400).send({message: "Invalid user ! please log in!"});
    }
}