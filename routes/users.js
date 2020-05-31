const router = require("express").Router();
let User = require("../models/user.model");

// Get all users from MongoDB
router.route("/").get((req, res) => {
    User.find()
        .then(users => res.json(users))
        .catch(err => res.status(400).json("Felmeddelande: " + err));
});

// Add user to MongoDB
router.route("/add").post((req, res) => {
    const username = req.body.username;

    const newUser = new User({username});

    newUser.save()
        .then(() => res.json("Användaren har lagts till!"))
        .catch(err => res.status(400).json("Felmeddelande: " + err));
});

// Get specific user from MongoDB
router.route("/:id").get((req, res) => {
    User.findById(req.params.id)
        .then(users => res.json(users))
        .catch(err => res.status(400).json("Felmeddelande: " + err));
});

// Delete user from MongoDB
router.route("/:id").delete((req, res) => {
    User.findByIdAndDelete(req.params.id)
        .then(() => res.json("Användaren har tagits bort"))
        .catch(err => res.status(400).json("Felmeddelande: " + err));
});

// Update user
router.route("/update/:id").post((req, res) => {
    User.findById(req.params.id)
        .then(user => {
            user.username = req.body.username;
            user.save()
                .then(() => res.json("Användare uppdaterad"))
                .catch(err => res.status(400).json("Felmeddelande: " + err));
        })
        .catch(err => res.status(400).json("Felmeddelande: " + err));
});

module.exports = router;