const router = require('express').Router();
let User = require('../models/food.model');

router.route('/').get((req, res) => {
    User.find()
        .select('name')
        .then(food => res.json(food))
        .catch(err => res.status(400).json('Error: ' + err))
});

router.route('/:id').get((req, res) => {
    User.findById(req.params.id)
        .select('name')
        .then(food => res.json(food))
        .catch(err => res.status(400).json('Error' + err))
});

router.route('/add').post((req, res) => {
    const food = req.body.name;

    const newFood = new User({
        name,
    });

    newFood.save()
        .then(() => res.json('Food saved!'))
        .catch(err => res.status(400).json('Error: ' + err))
});

router.route('/delete/:id').delete((req, res) => {
    User.findByIdAndDelete(req.params.id)
        .then(() =>res.json('Food Deleted'))
        .catch(err => res.status(400).json("Error: " + err))
});
