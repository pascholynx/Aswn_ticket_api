const express = require('express');
const bodyParser = require('body-parser');
const connectDB = require('./db');
const main = require("./routes/routes");

const app = express();

// Connect to MongoDB
connectDB();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Routes and Server Setup
app.use("/", main);

const PORT = process.env.PORT;

app.listen(PORT, () => console.log(`Server started on port ${PORT}`));
