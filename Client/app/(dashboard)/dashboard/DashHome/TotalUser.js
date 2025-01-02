import React from 'react'

export default function TotalUser({ userData }) {

    const { status, result } = userData;

    // <====== User Details dekahte hobe next time a ======>
    return (
        <div className="dashboardCard">
            <h2>Total User</h2>
            <p>{result?.length}</p>
        </div>
    )
}
