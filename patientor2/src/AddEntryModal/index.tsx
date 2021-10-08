import React, { useState } from 'react';
import { Modal, Segment } from 'semantic-ui-react';
import AddHospitalEntryForm, { HospitalEntryFormValues } from './AddHospitalEntryForm';
import AddHealthCheckEntryForm from './AddHealthCheckEntryForm';
import { HealthCheckEntryFormValues } from './AddHealthCheckEntryForm';
import AddOccupationalHealthcareEntryForm, { OccupationalHealthcareEntryFormValues } from './AddOccupationalHealthcareEntryForm';

interface Props {
  modalOpen: boolean;
  onClose: () => void;
  onHospitalSubmit: (values: HospitalEntryFormValues) => void;
  onHealthCheckSubmit: (values: HealthCheckEntryFormValues) => void;
  onOccupationalHealthcareSubmit: (values: OccupationalHealthcareEntryFormValues) => void;
  error?: string;
}

const AddEntryModal = ({ modalOpen, onClose, onHospitalSubmit, onHealthCheckSubmit, onOccupationalHealthcareSubmit, error }: Props) => {


  const [entryType, setEntryType] = useState("hospital");

  const handleChange = (e: React.FormEvent<HTMLSelectElement>) => {
    setEntryType(e.currentTarget.value);
  };

  return (
  <Modal open={modalOpen} onClose={onClose} centered={false} closeIcon>
    <Modal.Header>Add a new entry</Modal.Header>

    <Modal.Content>
      {error && <Segment inverted color="red">{`Error: ${error}`}</Segment>}
          <select value={entryType} onChange={handleChange}>
            <option value="hospital">Hospital Entry</option>
            <option value="health">Health Check</option>
            <option value="occupation">Occupational Health</option>
          </select>
      {entryType === "hospital" && <AddHospitalEntryForm onSubmit={onHospitalSubmit} onCancel={onClose} />}
      {entryType === "health" && <AddHealthCheckEntryForm onSubmit={onHealthCheckSubmit} onCancel={onClose} />}      
      {entryType === "occupation" && <AddOccupationalHealthcareEntryForm onSubmit={onOccupationalHealthcareSubmit} onCancel={onClose} />}    
    </Modal.Content>
  </Modal>
);
  };

export default AddEntryModal;
