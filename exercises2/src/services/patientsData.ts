import patients from '../types/patients';
import { Patient, NewPatient, PublicPatient } from '../types/Patient';
import { v1 as uuid } from 'uuid';
import { Entry } from '../types/Entry';

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

const addEntryForPatient = (patient: Patient, entry: Entry): Patient => {
    patient.entries.push(entry);

    return patient;
}

export default {
    getNonSensitiveEntries, addPatient, getPatient, addEntryForPatient
};

