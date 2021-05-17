import express from 'express';
import getPatients from '../services/patientsData';

const router = express.Router();

router.get('/', (_req, res) => {
    res.send(getPatients.getNonSensitiveEntries());
});

export default router;