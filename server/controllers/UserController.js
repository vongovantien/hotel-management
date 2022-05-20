const User = require("../models/UserModel.js");
const generateToken = require("../utils/generateToken");

login = async (req, res) => {
    const { email, password } = req.body;
    const user = await User.findOne({ email });
    if (user && (await user.matchPassword(password))) {
        return res.status(200).json({
            _id: user._id,
            name: user.name,
            email: user.email,
            isAdmin: user.isAdmin,
            token: generateToken(user._id),
            createdAt: user.createdAt,
        });
    } else {
        res.status(401);
        throw new Error("Invalid Email or Password");
    }
};

getAllUsers = async (req, res) => {
    try {
        const users = await User.find();
        res.status(200).json(users);
    } catch (error) {
        res.status(500).send(error.message);
    }
};

profile = async (req, res) => {
    try {
        const user = await User.findById(req.user._id);
        if (user) {
            user.name = req.body.name || user.name;
            if (req.body.password) {
                user.password = req.body.password;
            } else {
                res.status(404);
                throw new Error("User not found");
            }
            const updateUser = await user.save();
            res.json({
                _id: updateUser._id,
                name: updateUser.name,
                email: updateUser.email,
                isAdmin: updateUser.isAdmin,
                createAt: updateUser.createAt,
                token: generateToken(updateUser._id),
            });
        } else {
            res.status(404);
            throw new Error("User not found !!");
        }
        res.status(200).json(user);
    } catch (error) {
        res.status(500).send(error.message);
    }
};

register = async (req, res) => {
    try {
        const { name, email, password } = req.body;
        const userExist = await User.findOne({ email });
        if (userExist) {
            res.status(400).json({
                success: false,
                message: "User already exist",
            });
        }
        const user = await User.create({
            name,
            email,
            password,
        });
        if (user) {
            res.status(201).json({
                _id: user._id,
                name: user.name,
                email: user.email,
                isAdmin: user.isAdmin,
                token: generateToken(user._id),
                createdAt: user.createdAt,
            });
        } else {
            res.status(400).json({
                success: false,
                message: "Error",
            });
        }
        // await user.save().then(res.status(201).json(user));
    } catch (error) {
        res.status(500).send(error.message);
    }
};

updateUser = async (req, res) => {
    try {
        const user = await User.findById(req.user._id);
        if (user) {
            user.name = req.body.name || user.name;
            if (req.body.password) {
                user.password = req.body.password;
            } else {
                res.status(404);
                throw new Error("User not found");
            }
            const updateUser = await user.save();
            res.json({
                _id: updateUser._id,
                name: updateUser.name,
                email: updateUser.email,
                isAdmin: updateUser.isAdmin,
                createAt: updateUser.createAt,
                token: generateToken(updateUser._id),
            });
        } else {
            res.status(404);
            throw new Error("User not found !!");
        }
        res.status(200).json(user);
    } catch (error) {
        res.status(500).send(error.message);
    }
};

deleteUser = async (req, res) => {
    try {
        const user = await User.findById(req.params.id);
        await user.remove();
        res.status(200).json(user);
    } catch (error) {
        res.status(500).send(error.message);
    }
};

forgotPassword = async (req, res) => { };

updatePassword = async (req, res) => { };

module.exports = {
    login,
    register,
    profile,
    forgotPassword,
    updatePassword,
    deleteUser,
    updateUser,
    getAllUsers,
};
