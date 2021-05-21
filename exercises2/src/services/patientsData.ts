import patientsData from '../../data/patients.json';
import { Patient, NonSensitivePatient } from '../types/Patient';
import { v1 as uuid } from 'uuid';

const patients: Array<Patient> = patientsData;

const getNonSensitiveEntries = (): Array<NonSensitivePatient> => {
    return patients.map(({ id, name, dateOfBirth, gender, occupation }) => ({
        id,
        name,
        dateOfBirth,
        gender,
        occupation
    }));
}

const addPatient = (name: string, ssn: string, dateOfBirth: string, gender: string, occupation: string): Patient => {
    const newPatient = {
        id: uuid(),
        name: name,
        ssn: ssn,
        dateOfBirth: dateOfBirth,
        gender: gender,
        occupation: occupation
    }

    patients.push(newPatient);

    return newPatient;
}

export default {
    getNonSensitiveEntries, addPatient
};