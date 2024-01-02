const { hashPassword, comparePassword } = require('../helpers/authHelper');
const User = require('../models/userModel');
const JWT = require('jsonwebtoken');

const registerController = async (req, res) => {
    try {
        const { name, email, password, phone, address, answer } = req.body;

        //validation
        if (!name) {
            return res.status.send({
                success: false, message: 'Name is required'
            });
        }
        if (!email) {
            return res.status.send({
                success: false, message: 'Email is required'
            });
        }
        if (!password) {
            return res.status.send({
                success: false, message: 'Password is required'
            });
        }
        if (!phone) {
            return res.status.send({
                success: false, message: 'Phone is required'
            });
        }
        if (!address) {
            return res.status.send({
                success: false, message: 'Address is required'
            });
        }
        if (!answer) {
            return res.status.send({
                success: false, message: 'Answer is required'
            });
        }

        //Check user
        const existinguser = await User.findOne({ email })
        if (existinguser) {
            return res.status(200).send({
                success: false,
                message: 'Email already registered. Please login'
            })
        }

        //register user
        const hashedPassword = await hashPassword(password);

        //answer to lowercase
        const ans = answer.toLowerCase();

        //save
        const user = await new User({ name, email, phone, address, password: hashedPassword, answer: ans }).save();

        res.status(201).send({
            success: true,
            message: 'User registered successfully',
            user
        })

    } catch (error) {
        console.log(error);
        res.status(200).send({
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
            return res.status.send({
                success: false,
                message: 'Email or Password missing'
            })
        }

        const user = await User.findOne({ email });
        if (!user) {
            return res.send({
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
                address: user.address,
                role: user.role
            },
            token
        })
    } catch (error) {
        console.log(error);
        res.status.send({
            success: false,
            message: 'Error in Login',
            error
        })
    }
}

//forgotPasswordController
const forgotPasswordController = async (req, res) => {
    try {
        const { email, answer, newPassword } = req.body;
        if (!email) {
            res.status(200).send({
                success: false,
                message: 'Email is required'
            })
        }
        if (!answer) {
            res.status(200).send({
                success: false,
                message: 'Answer is required'
            })
        }
        if (!newPassword) {
            res.status(200).send({
                success: false,
                message: 'New Password is required'
            })
        }

        const ans = answer.toLowerCase();

        //check
        const user = await User.findOne({ email, answer: ans });

        if (!user) {
            return res.status(200).send({
                success: false,
                message: 'Wrong Email or Password'
            })
        }

        const hashedPassword = await hashPassword(newPassword);
        await User.findByIdAndUpdate(user._id, { password: hashedPassword })
        res.status(200).send({
            success: true,
            message: 'Password Updated Successfully'
        })
    } catch (error) {
        console.log(error);
        res.status(200).send({
            success: false,
            message: 'Something went wrong',
            error
        })
    }
}

const testController = (req, res) => {
    res.send("Protected Route");
}

const updateProfileController = async (req, res) => {
    try {
        const { name, email, password, phone, address } = req.body;
        const user = await User.findById(req.user._id);

        const hashedPassword = password ? await hashPassword(password) : undefined;
        const updatedUser = await User.findByIdAndUpdate(req.user._id, {
            name: name || user?.name,
            password: hashedPassword || user.password,
            email: email,
            address: address || user.address,
            phone: phone || user.phone
        }, { new: true })

        res.status(200).send({
            success: true,
            message: "User Profile updated successfully",
            updatedUser
        })
    } catch (error) {
        console.log(error);
        res.status(200).send({
            success: false,
            message: "Error in update prodile api",
            error
        })
    }
}

module.exports = { registerController, loginController, testController, forgotPasswordController, updateProfileController };