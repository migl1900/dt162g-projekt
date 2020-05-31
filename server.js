const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");
const path = require("path");

const app = express();
const port = process.env.PORT || 5000;

// Middleware
app.use(cors());
app.use(express.json());

// Connect to MongoDB
const db = process.env.ATLAS_URI || "mongodb+srv://dt162g_admin:McPfMcPf@cluster0-p2zig.mongodb.net/training?retryWrites=true&w=majority";
mongoose.connect(db, { useNewUrlParser: true, useCreateIndex: true, useUnifiedTopology: true })
 .then(() => console.log("Database connected"))
 .catch(err => console.log(err));

// Specify routes
const trainingsRouter = require("./routes/trainings");
const userRouter = require("./routes/users");

app.use("/trainings", trainingsRouter);
app.use("/users", userRouter);

app.use('/', express.static(path.join(__dirname, 'app/build')));

// Start local server
app.listen(port, () => {
    console.log("Server is running on port: " + port);
});