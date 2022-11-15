require('dotenv').config();
const express = require("express");
const mongoose = require("mongoose");
const cookieParser = require('cookie-parser');
const AppError = require('./utils/appError');
const userRoutes = require('./routes/user.routes');
const authRoutes = require("./routes/auth.routes");


const MONGO_URI = process.env.MONGO_URI || 'mongodb://localhost:27017/user-auth';
const PORT = process.env.PORT || 5000;
mongoose.connect(MONGO_URI, { useNewUrlParser: true })
  .then(() => console.log("connected to the database"))
  .catch((err) => console.log(err.message));
const app = express();

app.use("/public", express.static(__dirname + "/public"))
app.use(express.json({ limit: "50mb" }));
app.use(express.urlencoded({ limit: "50mb", extended: false }));
app.use(cookieParser());
app.use('/api/v1/users', userRoutes);
app.use("/api/v1/auth", authRoutes);

app.all('*', (req, res, next) => {
  next(new AppError(`Can't find ${req.originalUrl} on this server.`, 404));
});


app.listen(PORT, () => {
  console.log(`server started on port: ${PORT}`);
});