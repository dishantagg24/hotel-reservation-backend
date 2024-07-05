const Room = require("../models/Room");
const Hotel = require("../models/Hotel");

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
            { type: "apartment", count: apartmentCount },
            { type: "resort", count: resortCount },
            { type: "villa", count: villaCount },
            { type: "cabin", count: cabinCount },]);
    } catch (error) {
        res.status(500).json(error);
    }
}

const GetAllHotels = async (req, res) => {
    try {
        const { min = 1, max = 999, limit = 10, ...others } = req.query;

        // Validate and parse query parameters
        const minPrice = parseFloat(min);
        const maxPrice = parseFloat(max);
        const limitResults = parseInt(limit);

        // Build the query object
        const query = {
            ...others,
            cheapestPrice: { $gt: minPrice, $lt: maxPrice }
        };

        // Log the query for debugging
        console.log("Executing query:", query);

        // Fetch data from the database
        const allHotelsData = await Hotel.find(query).limit(limitResults);

        // Log the fetched data for debugging
        console.log("Fetched hotels data:", allHotelsData);

        // Send the response
        res.status(200).json(allHotelsData);
    } catch (error) {
        // Log the error for debugging
        console.error("Error fetching hotels:", error);

        // Send an error response
        res.status(500).json({
            message: "Internal server error",
            error: error.message || "Unknown error"
        });
    }
};


const GetHotelRooms = async (req, res) => {
    try {
        const hotel = await Hotel.findById(req.params.id);
        const list = await Promise.all(hotel.rooms.map((room) => {
            return Room.findById(room);
        }))
        res.status(200).json(list);
    } catch (error) {
        res.status(500).json(error);
    }
}

module.exports = { AddHotel, UpdateHotel, DeleteHotel, GetHotel, CountByCity, CountByType, GetAllHotels, GetHotelRooms };