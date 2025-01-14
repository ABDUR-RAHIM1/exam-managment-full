import { demoImg2 } from '@/app/DemoData/DemoImg'
import whyChooseUsData from '@/app/DemoData/WhyChoseData'
import Heading from '@/app/helpers/Heading'
import Image from 'next/image'
import React from 'react'

export default function WhyChose() {

    return (
        <div className=' wrap '>
            <div className=' w-full sm:w-[70%] md:w-[60%] m-auto'>
                <Heading text={"কেন আমাদের কোর্সগুলো কিনবেন?"} center={true} />
                <p className=' text-sm md:text-xl text-center'>
                    আমাদের কোর্স কেনা মানে আপনার স্বপ্নের চাকরির লক্ষ্যে এক ধাপ এগিয়ে যাওয়া। আমরা নিশ্চিত করি যেন প্রতিটি পরীক্ষার্থী তার জ্ঞান, দক্ষতা ও প্রস্তুতির সর্বোচ্চ মানে পৌঁছাতে পারে।
                </p>

            </div>
            <div className=' flex justify-between flex-wrap'>
                {
                    whyChooseUsData.map((why, index) => (
                        <div key={index} className=' w-full md:w-[31%] my-5 rounded-md border bg-gray-100'>
                            <div className=' w-full h-[300px] overflow-hidden'>
                                <Image
                                    width={500}
                                    height={500}
                                    src={why?.image || demoImg2}
                                    alt={why.title}
                                    className='w-full h-full rounded-md duration-200 hover:scale-150'
                                />

                            </div>
                            <div className='p-3'>
                                <h2 className='cardTitle'>{why.title}</h2>
                                <p className=' text-[13px]'>
                                    {why.description}
                                </p>
                            </div>
                        </div>
                    ))
                }
            </div>
        </div>
    )
}
