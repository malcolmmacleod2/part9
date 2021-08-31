import express from 'express';
import patientsData from '../services/patientsData';
import getPatients from '../services/patientsData';
import toNewPatient from '../utils/utilityFunctions';

const router = express.Router();

router.get('/', (_req, res) => {
    res.send(getPatients.getNonSensitiveEntries());
});

router.get('/:id', (_req, res) => {
    const id = _req.params.id;
    let patient = getPatients.getPatient(id);

    if (patient) {
        res.send(patient);
    } else {
        res.status(404).end();
    }
    
});

router.post('/', (req, res) => {
    const newPatient = toNewPatient(req.body);

    const addedPatient = patientsData.addPatient(newPatient);

    res.json(addedPatient);
})

export default router;