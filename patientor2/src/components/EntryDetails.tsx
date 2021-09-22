import React from "react";
import { Entry } from '../types';
import HospitalEntryDetails from './HospitalEntryDetails';
import HealthCheckEntryDetails from './HealthCheckEntryDetails';
import OccupationalHealthcareEntryDetails from './OccupationalHealthcareEntryDetails';

const EntryDetails: React.FC<{entry: Entry}> = ({entry}) => {
 
    switch (entry.type) {
        case "Hospital":
            return (<HospitalEntryDetails entry={entry}></HospitalEntryDetails>);
        case "HealthCheck":
            return (<HealthCheckEntryDetails entry={entry}></HealthCheckEntryDetails>);
        case "OccupationalHealthcare":
            return (<OccupationalHealthcareEntryDetails entry={entry}></OccupationalHealthcareEntryDetails>);
        
    }
};

export default EntryDetails;