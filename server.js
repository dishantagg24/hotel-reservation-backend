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

app.use(cors());
app.use(cookieParser());
app.use(express.json());

app.use('/api/auth', authRoute);
app.use('/api/hotels', hotelsRoute);
app.use('/api/user', userRoute);
app.use('/api/rooms', roomsRoute);

const PORT = process.env.PORT || 8000;

app.listen(PORT, () => {
    mongoose.connect(process.env.MONGO_URI, { useNewUrlParser: true }).then(() => console.log('Connected Successfully')).catch((err) => { console.error(err); });
})