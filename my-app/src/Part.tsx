import React from 'react';
import { CoursePart } from './CoursePart';

interface PartProps {
    part: CoursePart
}

const Part = ({part}: PartProps): JSX.Element => {
    switch(part.type) {
        case "normal":
            return (
                <div>
                    <p><b>Name: {part.name}</b></p>
                    <p>Exercise Count: {part.exerciseCount}</p>
                    <p>Description: {part.description}</p>
                </div>
            );
        case "groupProject":
            return (
                <div>
                    <p><b>Name: {part.name}</b></p>
                    <p>Exercise Count: {part.exerciseCount}</p>
                    <p>Group project count: {part.groupProjectCount}</p>
                </div>
            );

        case "submission":
            return (
                <div>
                    <p><b>Name: {part.name}</b></p>
                    <p>Exercise Count: {part.exerciseCount}</p>
                    <p>Description: {part.description}</p>
                    <p>Exercise Submission Link: {part.exerciseSubmissionLink} </p>
                </div>
            );

        case "special":
            return (
                <div>
                    <p><b>Name: {part.name}</b></p>
                    <p>Exercise Count: {part.exerciseCount}</p>
                    <p>Description: {part.description}</p>
                    <p>Required skills: {part.requirements.join(', ')} </p>
                </div>
            );
    }
};

/**
 * Helper function for exhaustive type checking
 */
const assertNever = (value: never): never => {
  throw new Error(
    `Unhandled discriminated union member: ${JSON.stringify(value)}`
  );
};

export default Part;