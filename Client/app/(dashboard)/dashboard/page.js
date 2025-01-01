import React from 'react'
import AdminLogOutBtn from './dashboardComponent/AdminLogOut'

export default function DashboardHome() {
    return (
        <div className=' bg-gray-100 rounded-md p-3'>
            <header className="flex justify-between items-center py-4 px-6 bg-white rounded-lg shadow-md mb-8">
                <h1 className="text-2xl font-semibold text-gray-800">Welcome to Admin Dashboard</h1>
                 <div className=' w-[100px]'>
                    <AdminLogOutBtn/>
                 </div>
            </header>

            <section className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {/* Demo widgets for overview */}
                <div className="bg-white rounded-lg shadow-md p-6">
                    <h2 className="text-lg font-semibold">Total Exams</h2>
                    <p className="mt-4 text-3xl font-bold text-blue-600">12</p>
                </div>
                <div className="bg-white rounded-lg shadow-md p-6">
                    <h2 className="text-lg font-semibold">Average Score</h2>
                    <p className="mt-4 text-3xl font-bold text-green-600">85%</p>
                </div>
                <div className="bg-white rounded-lg shadow-md p-6">
                    <h2 className="text-lg font-semibold">Upcoming Exams</h2>
                    <p className="mt-4 text-3xl font-bold text-yellow-600">3</p>
                </div>
            </section>
        </div>
    )
}
