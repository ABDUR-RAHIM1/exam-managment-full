import React from 'react'; 
import { getDataHandler } from '@/app/actions/users/getData';
import { publicCourseGet } from '@/app/constans/constans';
import NoDataFound from '@/app/components/Globals/NoDataFound';
import Cart from '@/app/components/Globals/Cart';
import CourseCard from './CourseCard'; 

export default async function CourseListHomePage() {
    const { result } = await getDataHandler(publicCourseGet)

    if (result && result.length < 1) {
        return <NoDataFound />
    }

    return (
        <div className=" relative bg-gray-100 min-h-screen py-10  z-40  ">
            <h1 className="text-center text-3xl font-bold text-gray-800 mb-6">All Courses</h1>
            <div className=" flex flex-wrap gap-6 px-4">
                {result && result.map(course => (
                    <CourseCard key={course._id} courseData={course} />
                ))}
            </div>

        </div>
    );
}
