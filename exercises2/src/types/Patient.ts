import { Gender } from './Gender';

export interface Patient {
    id: string;
    name: string;
    ssn: string;
    dateOfBirth: string;
    gender: Gender;
    occupation: string;
}

export type NonSensitivePatient = Omit<Patient, 'ssn'>

export type NewPatient = Omit<Patient, 'id'>;

