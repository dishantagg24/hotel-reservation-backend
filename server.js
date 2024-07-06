const express = require('express');
const mongoose = require('mongoose');
const dotenv = require("dotenv");
const cookieParser = require('cookie-parser');
const cors = require('cors');

dotenv.config();
const authRoute = require('./routes/auth');
const hotelsRoute = require('./routes/hotels');
const userRoute = require('./routes/user');
const roomsRoute = require('./routes/rooms');

const app = express();

app.use(cors({
    origin: '*',
    methods: 'GET,POST,PUT,DELETE',
    allowedHeaders: 'Content-Type,Authorization'
}));
app.use(cookieParser());
app.use(express.json());

app.use('/api/auth', authRoute);
app.use('/api/hotels', hotelsRoute);
app.use('/api/users', userRoute);
app.use('/api/rooms', roomsRoute);

const PORT = process.env.PORT || 8000;

const startServer = async () => {
    try {
        await mongoose.connect(process.env.MONGO_URI, {
            useNewUrlParser: true,
            useUnifiedTopology: true,
        });
        console.log('Connected to DB');

        app.listen(PORT, () => {
            console.log(`Server is listening on PORT: ${PORT}`);
        });
    } catch (error) {
        console.error('Failed to connect to DB:', error);
    }
};

startServer();
