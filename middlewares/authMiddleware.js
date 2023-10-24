const JWT = require('jsonwebtoken');
const User = require('../models/userModel');

//Protected Routes
const requireSignIn = async (req, res, next) => {
    try {
        const decode = JWT.verify(req.headers.authorization, process.env.JWT_SECRET);
        req.user = decode;
        next();
    } catch (error) {
        console.log(error);
        res.status(200).send({
            success: false,
            error
        })
    }
}

const isAdmin = async (req, res, next) => {
    try {
        const user = await User.findById(req.user._id);
        if (user.role !== 1) {
            return res.status(200).send({
                success: false,
                message: 'Unauthorized Access'
            })
        }
        next();
    } catch (error) {
        console.log(error);
        res.status(200).send({
            success: false,
            message: 'Error in Admin Middleware',
            error
        })
    }
}

module.exports = { requireSignIn, isAdmin };