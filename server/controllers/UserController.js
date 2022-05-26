const User = require("../models/UserModel.js");
const generateToken = require("../utils/generateToken");
// const fetch = require("node-fetch");
const { OAuth2Client } = require("google-auth-library");
const nodemailer = require("nodemailer");
const mongoose = require("mongoose");


const transport = nodemailer.createTransport({
    service: "Gmail",
    auth: {
        user: "vongovantien@gmail.com",
        pass: "vongovantien30820",
    },
});


sendConfirmationEmail = (name, email, confirmationCode) => {
    console.log("Check");
    transport.sendMail({
        from: "vongovantien@gmail.com",
        to: email,
        subject: "Please confirm your account",
        html: `<h1>Email Confirmation</h1>
          <h2>Hello ${name}</h2>
          <p>Thank you for subscribing. Please confirm your email by clicking on the following link</p>
          <a href=http://localhost:5000/api/users/confirm/${confirmationCode}> Click here</a>
          </div>`,
    }).catch(err => console.log(err));
};

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
        res.status(500).json({
            success: false,
            err: "Đăng nhập không thành công",
        });
    }
};

getAllUsers = async (req, res) => {
    try {
        let perPage = req.query.perPage || 5;
        let page = req.query.page || 1;

        await User.find()
            .select("-__v")
            .skip(perPage * page - perPage)
            .limit(perPage)
            .exec((err, result) => {
                User.countDocuments((err, count) => {
                    if (err) return next(err);
                    res.status(200).json({
                        success: true,
                        result,
                        current: page,
                        pages: Math.ceil(count / perPage),
                    });
                });
            });

    } catch (error) {
        res.status(500).json({ success: false, error: error.message });
    }
};

profile = async (req, res) => {
    try {
        const user = await User.findById(req.params.id).select("-password -__v");
        res.status(200).json({ success: true, user });
    } catch (error) {
        res.status(500).json({ success: false, error: error.message });
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

        console.log(userExist)
        const user = await User.create({
            name,
            email,
            password,
            confirmationCode: generateToken(email)
        });

        sendConfirmationEmail(
            user.name,
            user.email,
            user.confirmationCode
        )
        return res.status(201).json({
            message:
                "User was registered successfully! Please check your email",
        });
    } catch (error) {
        res.status(500).send(error.message);
    }
};

verifyUser = async (req, res, next) => {
    const existItem = await User.findOne({
        confirmationCode: req.params.confirmationCode,
    })
    console.log(req.params.confirmationCode)
    console.log(existItem)

    if (!existItem) {
        return res.status(404).send({ message: "User Not found." });
    }

    existItem.active = true;
    existItem.confirmationCode = null
    const user = await existItem.save();

    res.status(200).json({
        _id: user._id,
        name: user.name,
        email: user.email,
        isAdmin: user.isAdmin,
        active: user.active,
        token: generateToken(user._id),
        createdAt: user.createdAt,
        updatedAt: user.updatedAt,
    })
};

updateUser = async (req, res) => {
    try {
        const { name, email, password, isAdmin, createdAt, updatedAt } = req.body
        const existItem = await User.findById(req.params.id);
        console.log(existItem)
        if (!existItem) {
            return res.status(200).json({
                success: false,
                message: "User not found",
            });
        }
        existItem.name = name
        existItem.password = password;
        existItem.email = email;
        existItem.createAt = createdAt;
        existItem.updatedAt = updatedAt;

        const updateUser = await existItem.save();
        res.status(200).json({
            success: true,
            data: {
                _id: updateUser._id,
                name: updateUser.name,
                email: updateUser.email,
                isAdmin: updateUser.isAdmin,
                createAt: updateUser.createAt,
                updatedAt: updateUser.updateAt,
                token: generateToken(updateUser._id),
            }
        });
    } catch (error) {
        res.status(500).send(error.message);
    }
};

deleteUser = async (req, res) => {
    try {
        const existItem = await User.findById(req.params.id);
        if (!existItem) {
            return res.status(200).json({
                success: false,
                message: "User không tồn tại",
            });
        }
        await existItem.remove();
        return res.status(200).json({ success: true });
    } catch (error) {
        return res.status(500).json({ success: false, error: error.message });
    }
};

forgotPassword = async (req, res) => { };
resetPassword = async (req, res) => {
    const token = req.params.token;

}
googleLogin = async (req, res) => { };
facebookLogin = async (req, res) => {
    const { userID, accessToken } = req.body;
    let urlGraphFacebook = `https://graph.facebook.com/v2.11/${userID}/?fields=id,name,email&access_token=${accessToken}`;
    fetch(urlGraphFacebook, {
        method: "GET",
    })
        .then((res) => res.json)
        .then((res) => {
            const { email, name } = res;
            User.findOne({ email }).exec((err, user) => {
                if (err) {
                    return res.status(400).json({
                        error: "loi",
                    });
                } else {
                    if (user) {
                        const token = jwt.sign(
                            { _id: user._id },
                            process.env.JWT_SIGNIN_KEY,
                            { expiresIn: "7d" }
                        );
                        const { _id, name, email } = user;

                        res.json({
                            token,
                            user: { _id, name, email },
                        });
                    } else {
                        let password = email + process.env.JWT_SIGNIN_KEY;
                        let newUser = new User({ name, email, password });
                        newUser.save((err, data) => {
                            if (err) {
                                return res.status(400).json({
                                    error: "loi",
                                });
                            }
                            const token = jwt.sign(
                                { _id: data._id },
                                process.env.JWT_SIGNIN_KEY,
                                { expiresIn: "7d" }
                            );
                            res.json({
                                token,
                                user: { _id, name, email },
                            });
                        });
                    }
                }
            });
        });
};
module.exports = {
    login,
    register,
    profile,
    forgotPassword,
    deleteUser,
    updateUser,
    getAllUsers,
    googleLogin,
    facebookLogin,
    verifyUser
};
