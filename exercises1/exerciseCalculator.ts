interface Result {
    periodLength: number,
    trainingDays: number,
    success: boolean,
    rating: number,
    ratingDescription: string,
    target: number,
    average: number
}

const calculateExercise = (hours: Array<number>, target: number): Result => {

    const periodLength = hours.length;
    const trainingDays = hours.filter(h => h > 0).length;
    const success = periodLength === trainingDays;
    const totalHours = hours.reduce((t, v) => t + v);

    const rating = calculateRating(totalHours);
    const ratingDescription = getRatingDescription(rating);

    const average = totalHours / periodLength;

    return {
        periodLength: periodLength,
        trainingDays: trainingDays,
        success: success,
        rating: rating,
        ratingDescription: ratingDescription,
        target: target,
        average: average
    };
}

type Rating = 1 | 2 | 3;

type RatingDescription = 'rubbish and you must improve' | 'not too bad but could be better' | 'really excellent';

const calculateRating = (totalHours: number): Rating => {
    if (totalHours < 10) { return 1; }
    if (totalHours < 20) { return 2; }

    return 3;
}

const getRatingDescription = (rating: Rating): RatingDescription => {
    if (rating === 1) { return 'rubbish and you must improve'; }
    if (rating === 2) { return 'not too bad but could be better'; }

    return 'really excellent';
}

interface ExerciseValues {
    target: number;
    data: Array<number>;
}

const parseExerciseArguments = (args: Array<string>): ExerciseValues => {
    if (args.length < 4) throw new Error('Not enough arguments');

    if (!isNaN(Number(args[2]))) {
        const target = Number(args[2]);
        let data = [];

        for (let i = 3; i <= args.length; i++) {
            if (!isNaN(Number(args[i]))) {
                data.push(Number(args[i]));
            }
        }

        return {
            target: target,
            data: data
        }

    } else {
        throw new Error('Provided values were not numbers!');
    }
}

try {
    const { target, data } = parseExerciseArguments(process.argv);
    const result = calculateExercise(data, target);
    console.log(result);
} catch (e) {
    console.log('Error, something bad happened, message: ', e.message);
}

