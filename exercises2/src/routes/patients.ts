import express from 'express';
import patientsData from '../services/patientsData';
import getPatients from '../services/patientsData';

const router = express.Router();

router.get('/', (_req, res) => {
    res.send(getPatients.getNonSensitiveEntries());
});

router.post('/', (req, res) => {
    const { name, ssn, dateOfBirth, gender, occupation } = req.body;

    const newPatient = patientsData.addPatient(
        name,
        ssn,
        dateOfBirth,
        gender,
        occupation
    );

    res.json(newPatient);
})

export default router;