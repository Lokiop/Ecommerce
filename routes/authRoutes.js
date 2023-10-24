const express = require('express');
const { registerController, loginController, testController, forgotPasswordController } = require('../controllers/authController');
const { requireSignIn, isAdmin } = require('../middlewares/authMiddleware');

const router = express.Router();

//Routing
//POST || Register
router.post('/register', registerController);

//POST || Login
router.post('/login', loginController);

//Forgot Password || Post
router.post('/forgot-password', forgotPasswordController);

//protected route
router.get('/user-auth', requireSignIn, (req, res) => {
    res.status(200).send({ ok: true })
})

//test
router.get('/test', requireSignIn, isAdmin, testController);

module.exports = router;