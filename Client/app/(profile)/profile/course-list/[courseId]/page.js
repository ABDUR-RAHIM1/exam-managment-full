import { getDataById } from '@/app/actions/globals/getDataById';
import Cart from '@/app/components/Globals/Cart';
import EnrolBtn from '@/app/components/Globals/EnrolBtn';
import FreeExamBtn from '@/app/components/Globals/FreeExamBtn';
import { getCourseById } from '@/app/constans/constans';
import { courseImg, noImg } from '@/app/DemoData/DemoImg';
import Image from 'next/image';
import React from 'react';
import { PiStudent } from "react-icons/pi";

// in profile
export default async function CourseDetails({ params }) {
    const { courseId } = params;
    const { status, result } = await getDataById(getCourseById + courseId);

    if (status !== 200 || !result) {
        return <div className="text-center text-xl text-red-500">Course not found</div>;
    }

    const { _id, photo, category, title, desc, books, duration, schedule, regularPrice, offerPrice, note, questions } = result;


    return (
        <div className="bg-gray-50 py-10">
            <div className=" px-3 md:px-6">
                {/* Course Header */}
                <div className="flex flex-col md:flex-row items-center space-y-6 md:space-x-8 bg-white  p-2 md:p-6 rounded-xl shadow-lg">
                    <Image
                        width={500}
                        height={500}
                        src={photo || courseImg}
                        alt={title}
                        className="w-full md:w-1/3 rounded-xl shadow-md object-cover" />

                    <div className="md:w-2/3">
                        <h1 className="text-4xl font-bold text-gray-800">{title}</h1>
                        <p className="text-xl text-gray-600 mt-2">{category}</p>
                        <div className=' my-3 flex items-center texl-xl font-bold'>
                            <span className='text-2xl'> <PiStudent /> </span>  <span>{result?.access.length}</span>
                        </div>
                        <p>Total Exam : {questions?.length}</p>
                        <p className="text-lg text-gray-700 mt-4">{desc}</p>
                        <div className=" mt-6">
                            <del className='text-2xl font-semibold text-red-500'>Regular Price : {regularPrice}</del>
                            <p className="text-2xl font-semibold text-green-600"> Offer Price : {offerPrice} </p>
                        </div>
                        <div className="mt-6">
                            {
                                category === "free" ?
                                    <FreeExamBtn path={"/profile/upcoming-exam"} />
                                    :
                                    <EnrolBtn courseData={result} />
                            }
                        </div>
                    </div>
                </div>

                {/* Course Details */}
                <div className="mt-12 space-y-8">
                    {/* Duration */}
                    <div className="bg-white  p-2 md:p-6 rounded-xl shadow-md">
                        <h2 className="text-2xl font-semibold text-gray-800">Duration</h2>
                        <p className="text-lg text-gray-600">{duration}</p>
                    </div>


                    {/* Books */}
                    <div className="bg-white p-2 md:p-6 rounded-xl shadow-md">
                        <h2 className="text-2xl font-semibold text-gray-800">Books</h2>
                        <ul className="list-disc pl-6 mt-4 space-y-2">
                            {books?.map((book, index) => (
                                <li key={index} className="text-lg text-gray-600">{book}</li>
                            ))}
                        </ul>
                    </div>

                    {/* Notes */}
                    <div className="bg-white p-2 md:p-6 rounded-xl shadow-md">
                        <h2 className="text-2xl font-semibold text-gray-800">Notes</h2>
                        <ul className="list-disc pl-6 mt-4 space-y-2">
                            {note?.map((item, index) => (
                                <li key={index} className="text-lg text-gray-600">{item}</li>
                            ))}
                        </ul>
                    </div>


                    {/* Schedule */}
                    <div className="bg-white  p-2 md:p-6 rounded-xl shadow-md">
                        <h2 className="text-2xl mb-3 font-semibold text-gray-800">Schedule</h2>
                        <Image
                            width={1000}
                            height={1000}
                            alt='Course Shedule'
                            src={schedule || noImg}
                            className='w-auto h-auto m-auto'
                        />
                    </div>

                </div>
            </div>
            {/* Cart */}
            <Cart bgColor="bg-blue-600" textColor="text-black" />
        </div>
    );
}
