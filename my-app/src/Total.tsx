import React from 'react';

interface Course {
    name: string,
    exerciseCount: number
}

interface TotalProps {
    courses: Course[]
}

const Total = (props: TotalProps): JSX.Element => {
    return (
        <p>
        Number of exercises{" "}
        {props.courses.reduce((carry, part) => carry + part.exerciseCount, 0)}
      </p>
    )
};

export default Total;