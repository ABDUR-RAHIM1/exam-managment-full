"use client";
import CourseActions from '@/app/(profile)/profile/course-list/CourseActions';
import EnrolBtn from '@/app/components/Globals/EnrolBtn';
import React, { useState } from 'react';

// CourseCard Component
const CourseCard = (props) => {
    const { category, title, desc, books, duration, schedule, regularPrice, offerPrice, note } = props.courseData;
    const [showMore, setShowMore] = useState(false);

    const toggleShowMore = () => {
        setShowMore(prev => !prev);
    };

    return (
        <div className="w-full md:w-[48%] p-4">
            <div className="bg-white shadow-lg rounded-lg overflow-hidden h-full flex flex-col">
                <div className="p-6 flex-1">
                    {/* Course Title */}
                    <h2 className="text-lg font-bold text-gray-800 mb-2">{title}</h2>

                    {/* Category */}
                    <p className="text-sm text-gray-500 italic mb-4">শ্রেণী: {category}</p>

                    {/* Short Description */}
                    <p className="text-gray-600 mb-4">{desc.length > 100 ? `${desc.slice(0, 100)}...` : desc}</p>

                    {/* Show/Hide Details Button */}
                    <button
                        className="text-blue-600 font-semibold mb-4 underline"
                        onClick={toggleShowMore}
                    >
                        {showMore ? "কমান" : "আরো দেখান"}
                    </button>

                    {/* Expanded Details (only visible when `showMore` is true) */}
                    {showMore && (
                        <div>
                            {/* Books */}
                            <div className="mb-4">
                                <h3 className="font-semibold text-gray-700 mb-2">বইসমূহ:</h3>
                                <ul className="list-disc list-inside text-gray-600">
                                    {books.map((book, index) => (
                                        <li key={index}>{book}</li>
                                    ))}
                                </ul>
                            </div>

                            {/* Notes */}
                            <div className="my-5 bg-blue-100 py-3 px-2">
                                <ul className="list-inside space-y-3">
                                    <h3 className="font-bold my-2 italic">বিঃদ্রঃ </h3>
                                    {note && note.map((n, i) => (
                                        <li key={i}>{n}</li>
                                    ))}
                                </ul>
                            </div>

                            {/* Duration */}
                            <p className="text-gray-600 mb-4">
                                <span className="font-bold">সময়কাল:</span> {duration}
                            </p>

                            {/* Schedule */}
                            <div className="mb-4 text-center">
                                <CourseActions routinee={schedule} path={"/services/routine"} />
                            </div>
                        </div>
                    )}

                    {/* Prices */}
                    <div className="flex items-center justify-between mb-4">
                        <p className="text-gray-600">
                            <span className="font-bold">মূল্য:</span>{" "}
                            <span className="line-through text-red-500">৳{regularPrice}</span>
                        </p>
                        <p className="text-green-600 font-bold">মূল্য: ৳{offerPrice}</p>
                    </div>

                    {/* Enroll Button */}
                    <EnrolBtn courseData={props.courseData} />
                </div>
            </div>
        </div>
    );
};

export default CourseCard;
