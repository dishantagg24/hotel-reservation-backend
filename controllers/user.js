const User = require("../models/User")

const updateUser = async (req, res) => {
    console.log(req.params.id, req.body);
    try {
        const updatedUser = await User.findByIdAndUpdate(req.params.id, { $set: req.body }, { new: true });
        res.status(200).json(updatedUser);
    } catch (error) {
        res.status(500).json(error);
    }
}

const deleteUser = async (req, res) => {
    try {
        const deletedUser = await User.findByIdAndDelete(req.params.id);
        res.status(200).json(deletedUser);
    } catch (error) {
        res.status(500).json(error);
    }
}

const getUser = async (req, res) => {
    try {
        const user = await User.findById(req.params.id);
        res.status(200).json(user);
    } catch (error) {
        res.status(500).json(error);
    }
}

const getUsers = async (req, res) => {
    try {
        const users = await User.find();
        res.status(200).json(users);
    } catch (error) {
        res.status(500).json(error);
    }
}

module.exports = { updateUser, deleteUser, getUser, getUsers };