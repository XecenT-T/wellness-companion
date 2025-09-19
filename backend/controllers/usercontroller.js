const asynchandler = require("express-async-handler");
const U_model = require("../models/usermodel");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

//@ to register user
//@ api/user/register
//@ Type: POST
const register = asynchandler(async (req, res) => {
    const { username, phone_number, password } = req.body;
    if (!username || !phone_number || !password) {
        res.status(400); // Changed from 404 for Bad Request
        throw new Error("Please fill all mandatory fields");
    }
    const user_available = await U_model.findOne({ phone_number: phone_number });
    if (user_available) {
        res.status(400); // Changed from 404 for Bad Request
        throw new Error("Phone number already in use");
    }
    const Hashed_pass = await bcrypt.hash(password, 10);

    const user = await U_model.create({
        username,
        phone_number,
        password: Hashed_pass
    });
    if (user) {
        res.status(201).json({
            _id: user._id,
            username: user.username,
            phone_number: user.phone_number
        });
    } else {
        res.status(500);
        throw new Error("Failed to create user");
    }
});

//@ to login user
//@ api/user/login
//@ Type: POST
const login = asynchandler(async (req, res) => {
    const { phone_number, password } = req.body;
    if (!phone_number || !password) {
        res.status(400); // Changed for Bad Request
        throw new Error("All fields are mandatory");
    }
    const user = await U_model.findOne({ phone_number: phone_number });
    if (user && (await bcrypt.compare(password, user.password))) {
        const accessToken = jwt.sign({
            user: {
                username: user.username,
                phone_number: user.phone_number,
                id: user.id
            },
        },
            process.env.ACCESS_TOKEN_SECRET,
            { expiresIn: "10m" }
        );
        res.status(200).json({ accessToken }); // Wrapped token in an object
    }
    else {
        res.status(401);
        throw new Error("Phone number or password is invalid");
    }
});

//@ to get current user contacts
//@ api/user/current
//@ Type: GET
const current = asynchandler(async (req, res) => {
    // Assuming you would want to return the current user's info from the token
    res.status(200).json(req.user);
});

module.exports = { register, login, current };
