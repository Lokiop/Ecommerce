const { hashPassword, comparePassword } = require('../helpers/authHelper');
const User = require('../models/userModel');
const JWT = require('jsonwebtoken');

const registerController = async (req, res) => {
    try {
        const { name, email, password, phone, address } = req.body;

        //validation
        if (!name) {
            return res.status(404).send({ error: 'Name is required' });
        }
        if (!email) {
            return res.status(404).send({ error: 'Email is required' });
        }
        if (!password) {
            return res.status(404).send({ error: 'Password is required' });
        }
        if (!phone) {
            return res.status(404).send({ error: 'Phone is required' });
        }
        if (!address) {
            return res.status(404).send({ error: 'Address is required' });
        }

        //Check user
        const existinguser = await User.findOne({ email })
        if (existinguser) {
            return res.status(200).send({
                success: true,
                message: 'Email already registered. Please login'
            })
        }

        //register user
        const hashedPassword = await hashPassword(password);

        //save
        const user = await new User({ name, email, phone, address, password: hashedPassword }).save();

        res.status(201).send({
            success: true,
            message: 'User registered successfully',
            user
        })

    } catch (error) {
        console.log(error);
        res.status(500).send({
            success: false,
            message: 'Error in Registration',
            error
        })
    }
}

//Login User
const loginController = async (req, res) => {
    try {
        const { email, password } = req.body;
        //validation
        if (!email || !password) {
            return res.status(404).send({
                success: false,
                message: 'Email or Password missing'
            })
        }

        const user = await User.findOne({ email });
        if (!user) {
            return res.status(404).send({
                success: false,
                message: 'Email is not registered'
            })
        }

        const match = await comparePassword(password, user.password);
        if (!match) {
            return res.status(200).send({
                success: false,
                message: 'Invalid Password'
            })
        }

        //token
        const token = JWT.sign({ _id: user._id }, process.env.JWT_SECRET, {
            expiresIn: "7d",
        })

        res.status(201).send({
            success: true,
            message: 'Login Successful',
            user: {
                name: user.name,
                email: user.email,
                phone: user.phone,
                address: user.address
            },
            token
        })
    } catch (error) {
        console.log(error);
        res.status(500).send({
            success: false,
            message: 'Error in Login',
            error
        })
    }
}

const testController = (req, res) => {
    res.send("Protected Route");
}

module.exports = { registerController, loginController, testController };