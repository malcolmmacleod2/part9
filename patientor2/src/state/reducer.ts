import { State } from "./state";
import { Patient, Diagnosis } from '../types';

export type Action =
  | {
      type: "SET_PATIENT_LIST";
      payload: Patient[];
    }
  | {
      type: "ADD_PATIENT";
      payload: Patient;
    }
  | {
      type: "PATIENT_INFO";
      payload: Patient;
    }
  | {
      type: "SET_DIAGNOSES";
      payload: Diagnosis[];
    };

export const reducer = (state: State, action: Action): State => {
  switch (action.type) {
    case "SET_PATIENT_LIST":
      return {
        ...state,
        patients: {
          ...action.payload.reduce(
            (memo, patient) => ({ ...memo, [patient.id]: patient }),
            {}
          ),
          ...state.patients
        }
      };
    case "ADD_PATIENT":
      return {
        ...state,
        patients: {
          ...state.patients,
          [action.payload.id]: action.payload
        }
      };
    case "PATIENT_INFO":
      return {
        ...state,
        patient: action.payload 
      };
    case "SET_DIAGNOSES":
      return {
        ...state,
        diagnoses: {
          ...action.payload.reduce(
            (memo, diagnosis) => ({ ...memo, [diagnosis.code]: diagnosis }),
            {}
          ),
          ...state.diagnoses
      }
    };
      

    default:
      return state;
  }
};


const setPatientList = (patients: Patient[]) : Action => {
  return {
    type: 'SET_PATIENT_LIST',
    payload: patients
    };
  };

const setPatientInfo = (patient: Patient): Action => {
  return {
    type: "PATIENT_INFO",
    payload: patient
  };
};

const addPatient = (patient: Patient): Action => {
  return {
    type: "ADD_PATIENT",
    payload: patient
  };
};

const setDiagnoses = (diagnoses: Diagnosis[]) : Action => {
  console.info('Adding diagnoses to state');

  return {
    type: 'SET_DIAGNOSES',
    payload: diagnoses
    };
  };


  export {setPatientList, setPatientInfo, addPatient, setDiagnoses};