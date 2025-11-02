const express = require('express');
const cors = require('cors');
const connectDB = require('./configs/db');

const app = express();
const PORT = 3000;

app.use(cors());
app.use(express.json());


app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
    connectDB();
});
