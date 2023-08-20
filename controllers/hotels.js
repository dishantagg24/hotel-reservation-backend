const Hotel = require("../models/hotel");

const AddHotel = async (req, res) => {
    try {
        const newHotel = new Hotel(req.body);
        const savedHotel = await newHotel.save();
        res.status(201).json(savedHotel);
    } catch (error) {
        res.status(500).json(error);
    }
}

const UpdateHotel = async (req, res) => {
    try {
        const updatedHotel = await Hotel.findByIdAndUpdate(req.params.id, { $set: req.body }, { new: true });
        res.status(200).json(updatedHotel);
    } catch (error) {
        res.status(500).json(error);
    }
}

const DeleteHotel = async (req, res) => {
    try {
        const deletedHotel = await Hotel.findByIdAndDelete(req.params.id);
        res.status(200).json(deletedHotel);
    } catch (error) {
        res.status(500).json(error);
    }
}

const GetHotel = async (req, res) => {
    try {
        const hotelData = await Hotel.findById(req.params.id);
        res.status(200).json(hotelData);
    } catch (error) {
        res.status(500).json(error);
    }
}

const GetAllHotels = async (req, res) => {
    try {
        const allhotesData = await Hotel.find();
        res.status(200).json(allhotesData);
    } catch (error) {
        res.status(500).json(error);
    }
}

module.exports = { AddHotel, UpdateHotel, DeleteHotel, GetHotel, GetAllHotels };