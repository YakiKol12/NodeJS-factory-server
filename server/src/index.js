const express = require('express');
const cors = require('cors');
const connectDB = require('./configs/db');

const loginRouter = require('./routers/loginRouter');

const app = express();

app.use(cors());
app.use(express.json());

app.use('/login', loginRouter);


const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
    connectDB();
});
