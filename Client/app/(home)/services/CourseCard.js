
import EnrolBtn from '@/app/components/Globals/EnrolBtn';
import FreeExamBtn from '@/app/components/Globals/FreeExamBtn';
import { courseImg } from '@/app/DemoData/DemoImg';
import Image from 'next/image';
import Link from 'next/link';
import React from 'react';
import { PiStudent } from 'react-icons/pi';

// for Services page
export default function CourseCard(props) {
    const { _id, photo, category, title, desc, regularPrice, offerPrice, access } = props.courseData;


    return (
        <div className="w-full md:w-[48%]  bg-white rounded-lg shadow-lg overflow-hidden">
            <Link href={`/services/categorie/${category}/${_id}`} title='Click For Details' className=' w-full inline-block'>
                <Image
                    width={500}
                    height={450}
                    src={photo || courseImg}
                    alt="Course Image"
                    className="w-full h-56"
                />
            </Link>
            <div className="p-4">

                <div className=' flex items-center justify-between'>
                    <div title='Course Categorie' className="bg-blue-500 text-white text-xs font-bold uppercase py-1 px-3 rounded-full inline-block mb-2">
                        {category}
                    </div>
                    <div className=' my-3 flex items-center texl-xl font-bold'>
                        <span className='text-2xl'> <PiStudent /> </span>  <span>{access?.length}</span>
                    </div>
                    <h3 title='Course Name' className="text-xl font-bold mb-2 text-blue-500">{title}</h3>
                </div>

                <p className="text-gray-700 text-sm mb-4">
                    {desc}
                </p>
                <div className="flex mb-2 items-center justify-between">
                    <div className="text-red-500 line-through" >BDT- {regularPrice}</div>
                    <div className="text-blue-500 font-bold text-lg" >BDT-{offerPrice}</div>
                </div>

                {
                    category === "free" ?
                        <FreeExamBtn />
                        :
                        <EnrolBtn courseData={props.courseData} />
                }
            </div>

        </div>
    );
}
