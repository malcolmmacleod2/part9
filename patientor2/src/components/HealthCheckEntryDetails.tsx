import React from "react";
import { Icon } from 'semantic-ui-react';
import { HealthCheckEntry } from '../types';
import HealthCheckRatingIcon from './HealthCheckRatingIcon';

const HealthCheckEntryDetails: React.FC<{entry: HealthCheckEntry}> = ({entry}) => {

    return (<div>
        <p>
            <Icon name="stethoscope" size="big"></Icon>
            <label>{entry.date}</label>
        </p>

        <p>{entry.description}</p>
        <p>Specialist: {entry.specialist}</p>
        
        <p>Health check rating: <HealthCheckRatingIcon rating={entry.healthCheckRating}></HealthCheckRatingIcon></p>
        
    </div>);
};

export default HealthCheckEntryDetails;