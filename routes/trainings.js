const router = require("express").Router();
let Training = require("../models/training.model");

// Get all training sessions from MongoDB
router.route("/").get((req, res) => {
    Training.find()
        .then(trainings => res.json(trainings))
        .catch(err => res.status(400).json("Felmeddelande: " + err));
});

// Add new training session to MongoDB
router.route("/add").post((req, res) => {

    // Get values from form
    const username = req.body.username;
    const description = req.body.description;
    const duration = Number(req.body.duration);
    const date = Date.parse(req.body.date);

    const newTraining = new Training({
        username,
        description,
        duration,
        date,
    });

    // Save to MongoDB
    newTraining.save()
        .then(() => res.json("Träningspass tillagt!"))
        .catch(err => res.status(400).json("Felmeddelande: " + err));
});

// Get specific training session from MongoDB
router.route("/:id").get((req, res) => {
    Training.findById(req.params.id)
        .then(trainings => res.json(trainings))
        .catch(err => res.status(400).json("Felmeddelande: " + err));
});

// Delete training session from MongoDB
router.route("/:id").delete((req, res) => {
    Training.findByIdAndDelete(req.params.id)
        .then(() => res.json("Träningspasset har tagits bort"))
        .catch(err => res.status(400).json("Felmeddelande: " + err));
});

// Update training session
router.route("/update/:id").post((req, res) => {
    Training.findById(req.params.id)
        .then(training => {
            training.username = req.body.username;
            training.description = req.body.description;
            training.duration = Number(req.body.duration);
            training.date = Date.parse(req.body.date);

            training.save()
                .then(() => res.json("Träningspass uppdaterat"))
                .catch(err => res.status(400).json("Felmeddelande: " + err));
        })
        .catch(err => res.status(400).json("Felmeddelande: " + err));
});

module.exports = router;