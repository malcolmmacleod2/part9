import patientsData from '../../data/patients.json';
import { Patient, NewPatient, PublicPatient } from '../types/Patient';
import { v1 as uuid } from 'uuid';
import toNewPatient from '../utils/utilityFunctions';

const patients: Array<Patient> = patientsData.map(obj => {
    const patient = toNewPatient(obj) as Patient;
    patient.id = obj.id;
    return patient;
});

const getNonSensitiveEntries = (): Array<PublicPatient> => {
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

const getPatient = (id: string): Patient | null => {
    let patient = patients.find(p => p.id === id);

    return patient || null;
}

export default {
    getNonSensitiveEntries, addPatient, getPatient
};