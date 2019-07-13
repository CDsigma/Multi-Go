const mongoose = require('mongoose');

const express = require("express");
const app = express();
const db = require('./config/keys').mongoURI;
const bodyParser = require('body-parser');
const splash = require("./routes/api/splash");

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

mongoose
    .connect(db, { useNewUrlParser: true })
    .then(() => console.log("Connected to MongoDB successfully"))
    .catch(err => console.log(err));

// app.get("/", (req, res) => res.send("Hello World"));
app.use("/", splash);

const port = process.env.PORT || 5000;

app.listen(port, () => console.log(`Server is running on port ${port}`));