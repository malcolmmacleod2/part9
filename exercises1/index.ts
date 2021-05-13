import express from 'express';
import { calculateBmi } from './bmi';

const app = express();

app.get('/hello', (_req, res) => {
    res.send('Hello Full Stack!');
});

app.get('/bmi', (req, res) => {
    const weight = req.query.weight;
    const height = req.query.height;

    if (!req.query.weight || !req.query.height) {
        return res.status(400).json({
            error: "malformatted parameters"
        });
    }

    if (!isNaN(Number(weight)) && !isNaN(Number(height))) {
        const params = {
            heightInCentimeters: Number(height),
            weightInKilos: Number(weight)
        }

        const bmiResult = calculateBmi(params.heightInCentimeters, params.weightInKilos);

        return res.status(200).json({
            weight: params.weightInKilos,
            height: params.heightInCentimeters,
            bmi: bmiResult
        });
    } else {
        return res.status(400).json({
            error: "malformatted parameters"
        });
    }
});

const PORT = 3003;

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});