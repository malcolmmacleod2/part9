export interface Patient {
    id: string;
    name: string;
    dateOfBirth: string;
    gender: string;
    occupation: string;
}

export type NonSensitivePatient = Omit<Patient, 'ssn'>
