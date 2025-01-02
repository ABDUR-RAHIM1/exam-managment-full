import React from 'react'
import AdminLogOutBtn from './dashboardComponent/AdminLogOut'
import { getDataHandler } from '@/app/actions/users/getData'
import { getAlluser, publicCourseGet } from '@/app/constans/constans'
import TotalUser from './DashHome/TotalUser'
import TotalCourse from './DashHome/TotalCourse'
import TotalPurchase from './DashHome/TotalPurchase'

export default async function DashboardHome() {

    const [AllUser, AllCourse] = await Promise.all([
        getDataHandler(getAlluser),
        getDataHandler(publicCourseGet)
    ])

    // console.log(AllUser)

    return (
        <div className=' bg-gray-100 rounded-md p-3'>
            <header className="flex justify-between items-center py-4 px-6 bg-white rounded-lg shadow-md mb-8">
                <h1 className="text-2xl font-semibold text-gray-800">Welcome to Admin Dashboard</h1>
                <div className=' w-[100px]'>
                    <AdminLogOutBtn />
                </div>
            </header>

            <section className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">

                <TotalUser userData={AllUser} />
                <TotalCourse courseData={AllCourse} />
                <TotalPurchase courseData={AllCourse} />

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
