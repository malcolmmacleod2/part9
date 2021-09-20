import React, {useEffect } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import { Container } from "semantic-ui-react";
import { apiBaseUrl } from "../constants";
import { Entry, Patient } from '../types';
import { setPatientInfo, useStateValue } from "../state";
import GenderIcon from '../components/GenderIcon';

const PatientInformationPage = () => {

  const { id } = useParams<{ id: string }>();
  console.log(id);
  const [state, dispatch] = useStateValue();

  const patient = state.patient;
  const diagnoses = state.diagnoses;

  useEffect(() => {
    void axios.get<void>(`${apiBaseUrl}/ping`);

    const fetchPatientInfo = async () => {
      try {
        const { data: patientInfo } = await axios.get<Patient>(
          `${apiBaseUrl}/patients/${id}`
        );

        dispatch(setPatientInfo(patientInfo));
      } catch (e) {
        console.error(e);
      }
    };

    if (patient === null || patient.id !== id) {
      void fetchPatientInfo();
    }

  }, [dispatch]);

    return (
    <div className="App">
      <Container>
        <div>
          <h3>{patient && patient.name}</h3>
          { patient != null ? <GenderIcon gender={patient && patient.gender}></GenderIcon> : <div></div>}
        </div>
        <p>SSN: {patient && patient.ssn}</p>
        <p>Occupation: {patient && patient.occupation}</p>
        <h4>Entries</h4>
        <div>
          { patient && patient.entries.map((entry: Entry) => 
            (
              
              <div key={entry.id}>
                <p>{entry.date} <em>{entry.description}</em></p>
                <p>{diagnoses.length}</p>
                <ul>
                { entry.diagnosisCodes && entry.diagnosisCodes.map((d: string) => (
                  <li key={d}>{d} {diagnoses[d].name}</li>
                ))}
                </ul>

              </div>
            )
          )}
          
        </div>
      </Container>
    </div>
    );
};


export default PatientInformationPage;