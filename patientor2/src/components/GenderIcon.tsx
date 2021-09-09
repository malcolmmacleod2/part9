import React from 'react';
import { Gender } from '../types';
import { Icon } from 'semantic-ui-react';

interface GenderProps {
    gender: Gender
}

const GenderIcon = ({ gender }: GenderProps) => {
    switch (gender) {
        case Gender.Female:
            return (
                <div>
                    <Icon name="venus" size="big"></Icon>
                </div>
            );
        case Gender.Male:
            return (
                <div>
                    <Icon name="mars" size="big"></Icon>
                </div>
            );
        case Gender.Other:
            return (
                <div>
                    <Icon name="venus mars" size="big"></Icon>
                </div>
            );
    }
  
};

export default GenderIcon;