import React from "react";
import { Icon } from 'semantic-ui-react';
import { OccupationalHealthcareEntry } from '../types';

const OccupationalHealthcareEntryDetails: React.FC<{entry: OccupationalHealthcareEntry}> = ({entry}) => {

    return (<div>
        <p>       
            <Icon name="heartbeat" size="big"></Icon>
            <label>{entry.date}</label>
        </p>

        <p>{entry.description}</p>
        <p>Specialist: {entry.specialist}</p>

        {entry.sickLeave &&
        <div>
            <p>Sick leave details</p>
            {entry.sickLeave.startDate && <p>Started: {entry.sickLeave?.startDate}</p>}
            {entry.sickLeave.endDate && <p>Ended: {entry.sickLeave?.endDate}</p> }
        </div>
        }
    </div>);
};

export default OccupationalHealthcareEntryDetails;