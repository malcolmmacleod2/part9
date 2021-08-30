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
                    <p>Name: {part.name}</p>
                    <p>Exercise Count: {part.exerciseCount}</p>
                    <p>Description: {part.description}</p>
                </div>
            );
        case "groupProject":
            return (
                <div>
                    <p>Name: {part.name}</p>
                    <p>Exercise Count: {part.exerciseCount}</p>
                    <p>Group project count: {part.groupProjectCount}</p>
                </div>
            );

        case "submission":
            return (
                <div>
                    <p>Name: {part.name}</p>
                    <p>Exercise Count: {part.exerciseCount}</p>
                    <p>Description: {part.description}</p>
                    <p>Exercise Submission Link: {part.exerciseSubmissionLink} </p>
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