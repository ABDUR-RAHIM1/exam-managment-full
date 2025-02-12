import { getDataByQuery } from '@/app/actions/users/getDataByQuary';
import NoDataFound from '@/app/components/Globals/NoDataFound';
import React from 'react';
import CourseCard from '../../CourseCard';

// For dynamic services category items 
export default async function ServicesCategory({ params }) {
    const { category } = params;

    // Fetch data based on the category
    const { status, result } = await getDataByQuery(category);

    // If status is not 200, return a no-data-found message
    if (status !== 200) {
        return <NoDataFound text={result.message} />;
    }

    return (
        <div className="w-full relative z-50 bg-gray-100 min-h-screen py-10">
            {/* Title */}
            <h1 className="text-center text-3xl font-bold text-gray-800 mb-6">
                আমাদের কোর্স সমূহ
                <span className="ml-3 text-blue-800 font-bold">{category}</span>
            </h1>

            {/* Courses Grid */}
            <div className="flex flex-wrap gap-6 px-4 items-start justify-center">
                {result && result.length > 0 ? (
                    result.map(course => (
                        <CourseCard key={course._id} courseData={course} />
                    ))
                ) : (
                    <NoDataFound text="No courses available in this category." />
                )}
            </div>

        </div>
    );
}
