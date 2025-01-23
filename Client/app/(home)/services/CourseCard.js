"use client"
import EnrolBtn from '@/app/components/Globals/EnrolBtn';
import FreeExamBtn from '@/app/components/Globals/FreeExamBtn';
import Link from 'next/link';
import React, { useState } from 'react';

//  in services page
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
                <div className="flex mb-2 items-center justify-between">
                    <div className="text-red-500 line-through">BDT- {regularPrice}</div>
                    <div className="text-blue-500 font-bold text-lg">BDT-{offerPrice}</div>
                </div>

                <button
                    onClick={() => setShowDetails(!showDetails)}
                    className="bg-gray-300 text-gray-700 text-sm font-bold uppercase py-1 px-3 rounded-full mb-3"
                >
                    {showDetails ? 'Hide Details' : 'View Details'}
                </button>

                {showDetails && (
                    <div className="mt-2 space-y-2">
                        <div>
                            <span className="font-bold">Books:</span>
                            <ul className="list-disc list-inside text-gray-700 mt-1">
                                {books && books.length > 0
                                    ? books.map((book, index) => <li key={index}>{book}</li>)
                                    : "Not Available"}
                            </ul>
                        </div>
                        <div>
                            <span className="font-bold">Duration:</span> {duration || "Not Specified"}
                        </div>
                        <div className=' flex items-end justify-end'>
                            <Link href={{
                                pathname: `/services/categorie/routine`,
                                query: { routine: schedule }
                            }}
                                className=' py-2 px-3 font-bold bg-red-500 rounded-md text-gray-200 italic border-2 border-red-800'>
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
                        <FreeExamBtn />
                    ) : (
                        <EnrolBtn courseData={props.courseData} />
                    )}
                </div>
            </div>
        </div>
    );
}
