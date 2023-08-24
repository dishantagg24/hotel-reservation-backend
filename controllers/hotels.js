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

const CountByCity = async (req, res) => {
    const cities = req.query.cities.split(',');
    try {
        const list = await Promise.all(cities.map((city) => {
            return Hotel.countDocuments({ city: city })
        }))
        res.status(200).json(list);
    } catch (error) {
        res.status(500).json(error);
    }
}
const CountByType = async (req, res) => {
    try {
        const hotelCount = await Hotel.countDocuments({ type: 'hotel' });
        const apartmentCount = await Hotel.countDocuments({ type: 'apartment' });
        const resortCount = await Hotel.countDocuments({ type: 'resort' });
        const villaCount = await Hotel.countDocuments({ type: 'villa' });
        const cabinCount = await Hotel.countDocuments({ type: 'cabin' });
        res.status(200).json([
            { type: "hotel", count: hotelCount },
            { type: "apartments", count: apartmentCount },
            { type: "resorts", count: resortCount },
            { type: "villas", count: villaCount },
            { type: "cabins", count: cabinCount },]);
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

module.exports = { AddHotel, UpdateHotel, DeleteHotel, GetHotel, CountByCity, CountByType, GetAllHotels };