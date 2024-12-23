const express = require('express');
const { MongoClient } = require('mongodb');

const router = express.Router();

const uri = 'mongodb://localhost:27017';
const dbName = 'proj2024MongoDB';
let db;


MongoClient.connect(uri, { useUnifiedTopology: true })
    .then(client => {
        console.log('Connected to MongoDB from Lecturers');
        db = client.db(dbName);
    })
    .catch(err => {
        console.error('Failed to connect to MongoDB', err);
    });


router.get('/', async (req, res) => {
    try {
        const lecturers = await db.collection('lecturers').find().sort({ _id: 1 }).toArray();
        res.render('lecturers', { title: 'Lecturers Page', lecturers });
    } catch (err) {
        console.error(err);
        res.status(500).send('Error retrieving lecturers');
    }
});

router.post('/delete/:id', async (req, res) => {
    try {
        const lecturerId = req.params.id;
        await db.collection('lecturers').deleteOne({ _id: lecturerId });
        res.redirect('/lecturers');
    } catch (err) {
        console.error(err);
        res.status(500).send('Error deleting lecturer');
    }
});

module.exports = router;
