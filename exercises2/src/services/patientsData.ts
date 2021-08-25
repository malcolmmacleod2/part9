import patientsData from '../../data/patients.json';
import { Patient, NonSensitivePatient, NewPatient } from '../types/Patient';
import { v1 as uuid } from 'uuid';
import toNewPatient from '../utils/utilityFunctions';

const patients: Array<Patient> = patientsData.map(obj => {
    const patient = toNewPatient(obj) as Patient;
    patient.id = obj.id;
    return patient;
});

const getNonSensitiveEntries = (): Array<NonSensitivePatient> => {
    return patients.map(({ id, name, dateOfBirth, gender, occupation }) => ({
        id,
        name,
        dateOfBirth,
        gender,
        occupation
    }));
}

const addPatient = (patient: NewPatient): Patient => {
    const newPatient = {
        id: uuid(),
        ...patient
    };

    patients.push(newPatient);

    return newPatient;
}

export default {
    getNonSensitiveEntries, addPatient
};