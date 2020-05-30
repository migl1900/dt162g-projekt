const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");
const path = require("path");

const app = express();
const port = process.env.PORT || 5000;

// Middleware
app.use(cors());
app.use(express.json());
app.use(express.static(path.join(__dirname, 'app', 'build')));

// Connect to MongoDB
/*
mongoose.connect(MONGODB_URI, { useNewUrlParser: true, useCreateIndex: true, useUnifiedTopology: true })
 .then(() => console.log("Database connected"))
 .catch(err => console.log(err));
*/
const db = process.env.MONGODB_URL;

const connectDB = async () => {
  try {
    await mongoose.connect(db, {
      useUnifiedTopology: true,
      useNewUrlParser: true
    });
    console.log("MongoDB is Connected...");
  } catch (err) {
    console.error(err.message);
    process.exit(1);
  }
};

// Specify routes
const trainingsRouter = require("./routes/trainings");
const userRouter = require("./routes/users");

app.use("/trainings", trainingsRouter);
app.use("/users", userRouter);

app.get("*", (req, res) => {
    res.sendFile(path.join(__dirname, 'app', 'build', 'index.html'));
});

// Start local server
app.listen(port, () => {
    console.log("Server is running on port: " + port);
});