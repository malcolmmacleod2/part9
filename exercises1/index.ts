import express from 'express';
import { calculateBmi } from './bmi';
import { calculateExercise } from './exerciseCalculator';

const app = express();
app.use(express.json());

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
        };

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

app.post('/exercises', (req, res) => {

    console.log({ req });
    if (!req.body || !req.body.daily_exercises || !req.body.target) {
        return res.status(400).json({
            error: "parameters missing",
        });
    }

    if (!isNaN(Number(req.body.target))) {
        const daily_exercises = req.body.daily_exercises;
        const target = Number(req.body.target);
        const data = [];

        for (let i = 0; i < daily_exercises.length; i++) {
            if (!isNaN(Number(daily_exercises[i]))) {
                data.push(Number(daily_exercises[i]));
            } else {
                return res.status(400).json({
                    error: "malformed parameters",
                });
            }
        }

        const result = calculateExercise(data, target);

        return res.status(200).json(result);

    } else {
        return res.status(400).json({
            error: "malformed parameters",
        });
    }
});

const PORT = 3003;

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});