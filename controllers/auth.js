const jwt = require("jsonwebtoken");
const User = require("../models/User");
const bcrypt = require('bcryptjs');

const Register = async (req, res) => {
    var salt = bcrypt.genSaltSync(10);
    var hash = bcrypt.hashSync(req.body.password, salt);
    try {
        const newUser = new User({
            username: req.body.username,
            email: req.body.email,
            password: hash,
        })
        await newUser.save();
        res.status(201).send("User has been created.");
    } catch (error) {
        console.log(error);
    }
}

const Login = async (req, res) => {
    try {
        const user = await User.findOne({ username: req.body.username });
        if (!user) {
            res.status(404).send("User not found");
            return;
        }
        const isPasswordCorrect = await bcrypt.compareSync(req.body.password, user.password);
        if (!isPasswordCorrect) {
            res.status(400).send("Incorrect Password or User not found!");
            return;
        }
        const token = jwt.sign({ id: user._id, isAdmin: user.isAdmin }, process.env.JWT_TOKEN)
        const { password, ...otherDetails } = user._doc;
        res.cookie("access_token", token, { httpOnly: true }).status(200).json({ ...otherDetails });
    } catch (error) {
        console.log(error);
    }
}

module.exports = { Register, Login };