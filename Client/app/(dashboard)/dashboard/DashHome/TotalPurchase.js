import React from 'react'

export default function TotalPurchase({ courseData }) {
    const { status, result } = courseData;

 
    return (
        <div className="dashboardCard">
            <h2>Total Purchase</h2>
            <p>{result?.length}</p>
        </div>
    )
}
