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
        res.render('lecturers', { title: 'Lecturers Page', lecturers, error: null });
    } catch (err) {
        console.error(err);
        res.status(500).send('Error retrieving lecturers');
    }
});

router.post('/delete/:id', async (req, res) => {
    try {
        const lecturerId = req.params.id;

        const isAssociated = await db.collection('modules').findOne({ lecturerId });
        if (isAssociated) {
            return res.redirect(`/lecturers/error/${lecturerId}`);
        }

        await db.collection('lecturers').deleteOne({ _id: lecturerId });
        res.redirect('/lecturers');
    } catch (err) {
        console.error(err);
        res.status(500).send('Error deleting lecturer');
    }
});

router.get('/error/:lecturerId', (req, res) => {
    const lecturerId = req.params.lecturerId;
    res.render('error', {
        title: 'Error Message',
        message: `Cannot delete lecturer ${lecturerId}. He/She has associated modules.`,
    });
});

module.exports = router;
