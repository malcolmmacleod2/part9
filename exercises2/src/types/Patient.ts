import { Gender } from './Gender';

export interface Entry {

}

export interface Patient {
    id: string;
    name: string;
    ssn: string;
    dateOfBirth: string;
    gender: Gender;
    occupation: string;
    entries: Entry[];
}

export type NonSensitivePatient = Omit<Patient, 'ssn'>

export type NewPatient = Omit<Patient, 'id'>;

export type PublicPatient = Omit<Patient, 'ssn' | 'entries'>;

