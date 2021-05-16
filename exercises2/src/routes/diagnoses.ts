import express from 'express';
import getDiagnoses from '../services/diagnosesData';

const router = express.Router();

router.get('/', (_req, res) => {
    res.send(getDiagnoses.getDiagnoses());
});

export default router;