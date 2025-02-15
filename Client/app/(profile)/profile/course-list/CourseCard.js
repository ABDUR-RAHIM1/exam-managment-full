"use client"
import EnrolBtn from '@/app/components/Globals/EnrolBtn';
import FreeExamBtn from '@/app/components/Globals/FreeExamBtn';
import Link from 'next/link';
import React, { useState } from 'react';

//  in profile - course list page
export default function CourseCard(props) {
    const { category, title, desc, books, duration, schedule, regularPrice, offerPrice, note, questions } = props.courseData;
    const [showDetails, setShowDetails] = useState(false);

   


    return (
        <div className="w-full md:w-[48%] bg-white rounded-lg shadow-lg overflow-hidden">
            <div className="p-4">
                <div className="flex items-center justify-between flex-wrap my-2">
                    <div title="Course Category" className="bg-blue-500 text-white text-xs font-bold uppercase py-1 px-3 rounded-full inline-block mb-2">
                        {category}
                    </div>
                    <h3 title="Course Name" className="text-sm font-bold mb-2 text-blue-500">{title}</h3>
                </div>

                <p className="text-gray-700 text-sm mb-4">
                    {desc}
                </p>
                {/* Price Section */}
                <div className="mt-6 flex justify-center items-center space-x-3">
                    <span className="text-2xl font-semibold text-gray-800">Price:</span>
                    <span className="text-xl text-red-600 font-bold">BDT {offerPrice}</span>
                    <span className="text-lg line-through text-gray-500">BDT {regularPrice}</span>
                </div>
                <div className="mt-4 text-center">
                    <span className="text-lg font-medium text-gray-700 bg-gray-200 px-4 py-2 rounded-full">⏳ কোর্সটি চলবে: {duration}</span>
                </div>

                <button
                    onClick={() => setShowDetails(!showDetails)}
                    className="bg-gray-300 text-gray-700 text-sm font-bold uppercase py-1 px-3 rounded-full my-3"
                >
                    {showDetails ? 'বিস্তারিত বন্ধ করুন' : 'বিস্তারিত দেখুন'}
                </button>

                {showDetails && (
                    <div className="mt-2 space-y-2">
                        {/* Books List */}
                        <div className="mt-6 bg-gray-100 p-2 md:p-4 rounded-lg shadow">
                            <h3 className="text-lg font-bold text-red-700 mb-2">📚 যে বইগুলো থেকে পরীক্ষা নেওয়া হবে:</h3>
                            <p className="text-sm text-gray-700 whitespace-pre-line">
                                {books?.map((book, index) => (
                                    <span key={index} className="block px-3 py-1 bg-white shadow-sm rounded-md my-1">
                                        📖 {book}
                                    </span>
                                ))}
                            </p>
                        </div>

                        <div className=' flex items-end justify-end'>
                            <Link href={{
                                pathname: `/profile/course-list/routine`,
                                query: { routine: schedule }
                            }}
                                className=' py-2 px-3 font-bold bg-blue-500 rounded-md text-gray-200 italic border-1 border-blue-800 shadow-md'>
                                Routine
                            </Link>
                        </div>
                        <div>
                            <span className="font-bold">Note:</span>
                            <ul className="list-disc list-inside text-gray-700 mt-1">
                                {note && note.length > 0
                                    ? note.map((item, index) => <li key={index}>{item}</li>)
                                    : "No Notes"}
                            </ul>
                        </div>
                        <div>
                            <span className="font-bold">Questions:</span> {questions?.length || "No Questions"}
                        </div>
                    </div>
                )}

                <div className=' my-4'>
                    {category?.toLowerCase() === "free" ? (
                        <FreeExamBtn path="/profile/upcoming-exam" />
                    ) : (
                        <EnrolBtn courseData={props.courseData} />
                    )}
                </div>
            </div>
        </div>
    );
}
