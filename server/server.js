require('dotenv').config();
const express = require("express");
const session = require('express-session');
const cookieParser = require('cookie-parser');
const passport = require("passport");
const MongoStore = require('connect-mongo');
const connectDB = require("./utils/db.js");
const errorMiddleware = require('./middlewares/error-middleware.js');
const cors = require("cors");

const app = express();

app.use(express.json());

const corsOptions = {
    origin: process.env.FRONTEND_URL,
    methods: "GET, POST, DELETE, PATCH, HEAD",
    credentials: true,
};
app.use(cors(corsOptions));
app.use("/api/auth", require("./router/auth-router.js"));
app.use("/api/home", require("./router/home-router.js"));
app.use(errorMiddleware);

const port = process.env.PORT || 8000;
connectDB().then(() => {
    app.listen(port, () => {
        console.log(`Server is running at port ${port}`);
    });
});