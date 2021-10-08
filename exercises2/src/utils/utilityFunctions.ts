import { Gender } from '../types/Gender';
import { NewPatient } from '../types/Patient';
import { Entry, Discharge, SickLeave, HealthCheckRating } from '../types/Entry';
import { v1 as uuid } from 'uuid';

type Fields = { 
  name: unknown, 
  ssn: string, 
  dateOfBirth: unknown, 
  gender: unknown, 
  occupation: unknown, 
  entries: Entry[] }

type EntryFields = {
  description: unknown, 
  date: unknown, 
  type: unknown, 
  diagnosisCodes: string[], 
  specialist: unknown,
  healthCheckRating: unknown,
  discharge: unknown,
  sickLeave: unknown,
  employerName: string
};

type EntryType = "HealthCheck" | "Hospital" | "OccupationalHealthcare";

const toNewPatient = ({ name, ssn, dateOfBirth, gender, occupation, entries } : Fields): NewPatient => {
    const newPatient: NewPatient = {
        name: parseName(name),
        ssn: parseSSN(ssn),
        dateOfBirth: parseDate(dateOfBirth),
        gender: parseGender(gender),
        occupation: parseOccupation(occupation),
        entries: entries
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

const parseString = (string: unknown): string => {
  if (!string || !isString(string)) {
      throw new Error('Incorrect or missing string: ' + string);
  }
  return string;
};

const parseType = (type: unknown): EntryType => {
  if (!type || !isString(type) || (type as EntryType === undefined)) {
      throw new Error('Incorrect or missing type: ' + type);
  }

  return type as EntryType;
};

const parseDischarge = (discharge: unknown): Discharge => {
  if (!discharge || discharge as Discharge === undefined) {
      throw new Error('Incorrect or missing discharge: ' + discharge);
  }

  return discharge as Discharge;
};

const parseHealthCheckRating = (entry: unknown): HealthCheckRating => {
  if (!entry) {
      throw new Error('Incorrect or missing entry: ' + entry);
  }
  
  return entry as HealthCheckRating;
};

const parseSickLeave = (sickLeave: unknown): SickLeave => {
  if (!sickLeave || sickLeave as SickLeave === undefined) {
      throw new Error('Incorrect or missing sick Leave: ' + sickLeave);
  }
  
  return sickLeave as SickLeave;
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

const toNewEntry = ({
  description, 
  date, 
  type, 
  diagnosisCodes, 
  specialist,
  healthCheckRating,
  discharge,
  sickLeave,
  employerName

}: EntryFields): Entry => {
    const entryType = parseType(type);

    switch (entryType) {
        case "HealthCheck":

          const healthCheckEntry: Entry = {
            id: uuid(),
            description: parseString(description),
            date: parseDate(date),
            type: "HealthCheck",
            specialist: parseString(specialist),
            healthCheckRating: parseHealthCheckRating(healthCheckRating),
            diagnosisCodes: diagnosisCodes
          };

          return healthCheckEntry;

        case "Hospital":
          const hospitalEntry: Entry = {
            id: uuid(),
            description: parseString(description),
            date: parseDate(date),
            type: "Hospital",
            specialist: parseString(specialist),
            discharge: parseDischarge(discharge),
            diagnosisCodes: diagnosisCodes
          };

          return hospitalEntry;

        case "OccupationalHealthcare":
          const occupationalHealthcareEntry: Entry = {
            id: uuid(),
            description: parseString(description),
            date: parseDate(date),
            type: "OccupationalHealthcare",
            specialist: parseString(specialist),
            sickLeave: parseSickLeave(sickLeave),
            employerName: parseString(employerName),
            diagnosisCodes: diagnosisCodes
          };

          return occupationalHealthcareEntry;
    }
}

export { toNewPatient, toNewEntry };