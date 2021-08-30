import React from 'react';
import { CoursePart } from './CoursePart';
import Part from './Part';

interface ContentProps {
    courses: CoursePart[]
}

const Content = ({courses}: ContentProps): JSX.Element => {
    return (
    <div>
      {courses.map((part: CoursePart) =><Part key={part.name} part={part}></Part>)};
    </div>
    )
};

export default Content