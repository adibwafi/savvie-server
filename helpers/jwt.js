const jwt = require("jsonwebtoken");
const secretKey = process.env.SECRET_KEY;

const createSign = (payload) => jwt.sign(payload, secretKey);
const verifyToken = (access_token) => jwt.verify(access_token, secretKey);

module.exports = { createSign, verifyToken };
