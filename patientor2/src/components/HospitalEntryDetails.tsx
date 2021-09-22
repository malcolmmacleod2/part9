import React from "react";
import { Icon } from 'semantic-ui-react';
import { HospitalEntry } from '../types';

const HospitalEntryDetails: React.FC<{entry: HospitalEntry}> = ({entry}) => {

    return (<div>
        <p>
            <Icon name="hospital" size="big"></Icon>
            <label>{entry.date}</label>
        </p>
        
        <p>{entry.description}</p>
        <p>Specialist: {entry.specialist}</p>

        {entry.discharge && <p>Discharged: {entry.discharge?.date} Reason: {entry.discharge?.criteria}</p>}
    </div>);
};

export default HospitalEntryDetails;