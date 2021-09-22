import React from "react";
import { Icon } from 'semantic-ui-react';
import { HealthCheckRating } from '../types';

interface HealthCheckRatingProps {
    rating: HealthCheckRating;
}

const HealthCheckRatingIcon = ({rating}: HealthCheckRatingProps) => {
    switch (rating){
        case HealthCheckRating.Healthy:
            return (
                <Icon name="heart" size="big" color="green"></Icon>
            );
        case HealthCheckRating.LowRisk:
            return (
                <Icon name="heart" size="big" color="yellow"></Icon>
            );
        case HealthCheckRating.HighRisk:
            return (
                <Icon name="heart" size="big" color="orange"></Icon>
            );
        case HealthCheckRating.CriticalRisk:
            return (
                <Icon name="heart" size="big" color="red"></Icon>
            );
    }
};

export default HealthCheckRatingIcon;