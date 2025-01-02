import React from 'react'

export default function TotalCourse({ courseData }) {
    const { status, result } = courseData;

    return (
        <div className="dashboardCard">
            <h2>Total Course</h2>
            <p>{result?.length}</p>
        </div>
    )
}
