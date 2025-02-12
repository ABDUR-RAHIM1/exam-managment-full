import React from 'react';
import { getDataHandler } from '@/app/actions/users/getData';
import { publicCourseGet } from '@/app/constans/constans';
import NoDataFound from '@/app/components/Globals/NoDataFound';
import CourseCard from './CourseCard';

export default async function CourseListHomePage() {
    const { result } = await getDataHandler(publicCourseGet)

    if (result && result.length < 1) {
        return <NoDataFound />
    }

    return (
        <div className=" relative min-h-screen py-10  z-40  ">
            <h1 className="text-center text-3xl font-bold text-gray-800 mb-6">
                আমাদের কোর্স সমূহ
            </h1>

            <div className=" flex items-start justify-between flex-wrap gap-6">
                {result && result.map(course => (
                    <CourseCard key={course._id} courseData={course} />
                ))}
            </div>
        </div>
    );
}
