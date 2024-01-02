const express = require('express');
const { registerController, loginController, testController, forgotPasswordController, updateProfileController } = require('../controllers/authController');
const { requireSignIn, isAdmin } = require('../middlewares/authMiddleware');

const router = express.Router();

//Routing
//POST || Register
router.post('/register', registerController);

//POST || Login
router.post('/login', loginController);

//Forgot Password || Post
router.post('/forgot-password', forgotPasswordController);

//protected route user auth
router.get('/user-auth', requireSignIn, (req, res) => {
    res.status(200).send({ ok: true })
})

//protected route admin auth
router.get('/admin-auth', requireSignIn, isAdmin, (req, res) => {
    res.status(200).send({ ok: true })
})

//update profile
router.put('/profile', requireSignIn, updateProfileController);

//test
router.get('/test', requireSignIn, isAdmin, testController);

module.exports = router;