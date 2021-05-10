type BmiResult = 'Very severely underweight' |
    'Severely underweight' |
    'Underweight' |
    'Normal (healthy weight)' |
    'Overweight' |
    'Obese Class I (Moderately obese)' |
    'Obese Class II (Severely obese)' |
    'Obese Class III(Very severely obese)';


const calculateBmi = (heightInCentimeters: number, weightInKilos: number): BmiResult => {
    const height = heightInCentimeters / 100;
    const heightSquared = Math.pow(height, 2);

    if (heightSquared === 0) {
        throw new Error('Can\'t divide by 0!');
    }

    const bmi = (weightInKilos / heightSquared);

    if (bmi < 15) {
        return 'Very severely underweight';
    }
    if ((15 <= bmi) && (bmi < 16)) {
        return 'Severely underweight';
    }
    if ((16 <= bmi) && (bmi < 18.5)) {
        return 'Underweight';
    }
    if ((18.5 <= bmi) && (bmi < 25)) {
        return 'Normal (healthy weight)';
    }
    if ((25 <= bmi) && (bmi < 30)) {
        return 'Overweight';
    }
    if ((30 <= bmi) && (bmi < 35)) {
        return 'Obese Class I (Moderately obese)';
    }
    if ((35 <= bmi) && (bmi < 40)) {
        return 'Obese Class II (Severely obese)';
    }
    if (40 <= bmi) {
        return 'Obese Class III(Very severely obese)';
    }
}

interface BmiValues {
    heightInCentimeters: number;
    weightInKilos: number;
}

const parseBmiArguments = (args: Array<string>): BmiValues => {
    if (args.length < 4) throw new Error('Not enough arguments');
    if (args.length > 4) throw new Error('Too many arguments');

    if (!isNaN(Number(args[2])) && !isNaN(Number(args[3]))) {
        return {
            heightInCentimeters: Number(args[2]),
            weightInKilos: Number(args[3])
        }
    } else {
        throw new Error('Provided values were not numbers!');
    }
}

try {
    const { heightInCentimeters, weightInKilos } = parseBmiArguments(process.argv);
    const result = calculateBmi(heightInCentimeters, weightInKilos);
    console.log(result);
} catch (e) {
    console.log('Error, something bad happened, message: ', e.message);
}
