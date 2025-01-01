import { demoImg2 } from '@/app/DemoData/DemoImg'
import whyChooseUsData from '@/app/DemoData/WhyChoseData'
import Heading from '@/app/helpers/Heading'
import Image from 'next/image'
import React from 'react'

export default function WhyChose() {

    return (
        <div className=' wrap '>
            <Heading text={"কেন আমাদের নির্বাচন করবেন?"} center={true} />

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
