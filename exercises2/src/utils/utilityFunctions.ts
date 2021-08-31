import { Gender } from '../types/Gender';
import { NewPatient } from '../types/Patient';

type Fields = { name: unknown, ssn: string, dateOfBirth: unknown, gender: unknown, occupation: unknown, entries: string[] }

const toNewPatient = ({ name, ssn, dateOfBirth, gender, occupation, entries } : Fields): NewPatient => {
    const newPatient: NewPatient = {
        name: parseName(name),
        ssn: parseSSN(ssn),
        dateOfBirth: parseDate(dateOfBirth),
        gender: parseGender(gender),
        occupation: parseOccupation(occupation),
        entries: entries || []
    }

    return newPatient;
}

const parseName = (name: unknown): string => {
    if (!name || !isString(name)) {
        throw new Error ('Incorrect or missing name');
    }

    return name;
}

const parseSSN = (ssn: unknown): string => {
    if (!ssn || !isString(ssn)) {
        throw new Error ('Incorrect or missing ssn');
    }

    return ssn;
}

const parseOccupation = (occupation: unknown): string => {
    if (!occupation || !isString(occupation)) {
        throw new Error ('Incorrect or missing occupation');
    }

    return occupation;
}

const parseDate = (date: unknown): string => {
  if (!date || !isString(date) || !isDate(date)) {
      throw new Error('Incorrect or missing date: ' + date);
  }
  return date;
};

const parseGender = (gender: unknown): Gender => {
  if (!gender || !isGender(gender)) {
      throw new Error('Incorrect or missing gender: ' + gender);
  }
  return gender;
};

const isString = (text: unknown): text is string => {
    return typeof text === 'string' || text instanceof String;
}

const isDate = (date: string): boolean => {
  return Boolean(Date.parse(date));
};

const isGender = (param: any): param is Gender => {
  return Object.values(Gender).includes(param);
};

export default toNewPatient;