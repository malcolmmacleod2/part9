import React from 'react';

interface Course {
    name: string,
    exerciseCount: number
}

interface ContentProps {
    course: Course
}

const Content = ({course}: ContentProps): JSX.Element => {
    return (
        <p>
            {course.name} {course.exerciseCount}
        </p>
    )
};

export default Content