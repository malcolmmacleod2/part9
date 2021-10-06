import React, {useEffect } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import { Button, Container } from "semantic-ui-react";
import { apiBaseUrl } from "../constants";
import { Entry, Patient } from '../types';
import { setPatientInfo, useStateValue } from "../state";
import GenderIcon from '../components/GenderIcon';
import EntryDetails from '../components/EntryDetails';
import { HospitalEntryFormValues } from "../AddEntryModal/AddHospitalEntryForm";
import { HealthCheckEntryFormValues } from '../AddEntryModal/AddHealthCheckEntryForm';
import AddEntryModal from "../AddEntryModal";

const PatientInformationPage = () => {

  const [modalOpen, setModalOpen] = React.useState<boolean>(false);
  const [error, setError] = React.useState<string | undefined>();

  const openModal = (): void => setModalOpen(true);

  const closeModal = (): void => {
    setModalOpen(false);
    setError(undefined);
  };

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

   const submitNewEntry = async (values: HospitalEntryFormValues | HealthCheckEntryFormValues) => {
    try {
      if (patient && patient.id) {
        const { data: updatedPatient } = await axios.post<Patient>(
                `${apiBaseUrl}/patients/${patient.id}/entries`,
                values
              );
        dispatch(setPatientInfo(updatedPatient));
      }

      closeModal();
    } catch (e) {
      console.error(e.response?.data || 'Unknown Error');
      setError(e.response?.data?.error || 'Unknown error');
    }
  };

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
                <EntryDetails entry={entry} />

                <ul>
                { entry.diagnosisCodes && entry.diagnosisCodes.map((d: string) => (
                  <li key={d}>{diagnoses[d].name}</li>
                ))}
                </ul>

              </div>
            )
          )}
          
        </div>

        <AddEntryModal
          modalOpen={modalOpen}
          onSubmit={submitNewEntry}
          error={error}
          onClose={closeModal}
        />

        <Button onClick={() => openModal()}>Add New Entry</Button>
      </Container>
    </div>
    );
};


export default PatientInformationPage;