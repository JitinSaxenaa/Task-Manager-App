const express = require('express');
const app = express();
require('dotenv').config();
const connectDB = require('./models/db');
const PORT = process.env.PORT || 8080;

const TaskRouter = require('./routes/taskrouter');
const bodyParser = require('body-parser');

const cors = require('cors');

app.get('/', (req, res) => {
    res.send('Hello from the server');
});

app.use(cors())

app.use(bodyParser.json());

app.use(async (req, res, next) => {
    try {
        await connectDB();
        next();
    } catch (err) {
        res.status(500).json({ message: 'Database connection failed', success: false });
    }
});

app.use('/tasks', TaskRouter)

module.exports = app;

if (require.main === module) {
    app.listen(PORT, () => {
        console.log(`Server is running on PORT=${PORT}`);
    });
}