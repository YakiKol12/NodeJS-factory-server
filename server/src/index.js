require('dotenv').config({ path: '../.env' });
const express = require('express');
const cors = require('cors');
const connectDB = require('./configs/db');

const loginRouter = require('./routers/loginRouter');
const userRouter = require('./routers/usersRouter');
const departmentsRouter = require('./routers/departmentsRouter');
const employeesRouter = require('./routers/employeesRouter');
const shiftsRouter = require('./routers/shiftsRouter');
const pagesRouter = require('./routers/pagesRouter');

const app = express();

app.use(cors());
app.use(express.json());

app.use('/login', loginRouter);
app.use('/users', userRouter);
app.use('/departments', departmentsRouter);
app.use('/employees', employeesRouter);
app.use('/shifts', shiftsRouter);
app.use('/main', pagesRouter);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
    connectDB();
});
