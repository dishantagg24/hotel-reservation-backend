const Room = require("../models/Room");
const Hotel = require("../models/Hotel");

const createRoom = async (req, res) => {
    const hotelId = req.params.hotelId;
    const newRoom = new Room(req.body);
    try {
        const savedRoom = await newRoom.save();
        try {
            await Hotel.findByIdAndUpdate(hotelId, { $push: { rooms: savedRoom._id } });
        } catch (error) {
            res.status(500).json(error);
        }
        res.status(201).json(savedRoom);
    } catch (error) {
        res.status(500).json(error);
    }
}

const updateRoom = async (req, res) => {
    try {
        const updatedRoom = await Room.findByIdAndUpdate(req.params.id, { $set: req.body }, { new: true });
        res.status(200).json(updatedRoom);
    } catch (error) {
        res.status(500).json(error);
    }
}
const updateRoomAvailability = async (req, res) => {
    try {
        await Room.updateOne({ "roomNumbers._id": req.params.id }, { $push: { "roomNumbers.$.unavailableDates": req.body.dates } })
    } catch (error) {
        res.status(500).json(error);
    }
}
const deleteRoom = async (req, res) => {
    const hotelId = req.params.hotelId;
    try {
        const deletedRoom = await Room.findByIdAndDelete(req.params.id);
        try {
            await Hotel.findByIdAndUpdate(hotelId, { $pull: { rooms: req.params.id } });
        } catch (error) {
            res.status(500).json(error);
        }
        res.status(200).json(deletedRoom);
    } catch (error) {
        res.status(500).json(error);
    }
}

const getRoom = async (req, res) => {
    try {
        const room = await Room.findById(req.params.id);
        res.status(200).json(room);
    } catch (error) {
        res.status(500).json(error);
    }
}

const getAllRooms = async (req, res) => {
    res.send("Hello");
    // try {
    //     const rooms = await Room.find();
    //     res.status(200).json(rooms);
    // } catch (error) {
    //     res.status(500).json(error);
    // }
}
module.exports = { createRoom, updateRoom, updateRoomAvailability, deleteRoom, getRoom, getAllRooms }