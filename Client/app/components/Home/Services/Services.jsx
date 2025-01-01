import { demoImg } from '@/app/DemoData/DemoImg'
import servicesData from '@/app/DemoData/ServicesData'
import Heading from '@/app/helpers/Heading'
import Image from 'next/image'
import Link from 'next/link'
import React from 'react'


export default function Services() {
    return (
        <div className=' wrap bg-gray-100 bg-opacity-40 '>
            <Heading text={"আমাদের কোর্স সমূহের মাধ্যমে আপনার লক্ষ্য অর্জন করুন"} />

            <div className=' flex justify-between flex-wrap'>
                {
                    servicesData.map((service, index) => (
                        <div key={index} className=' w-full md:w-[48%] my-5 p-3 bg-gray-50 shadow-md rounded-md'>
                            <div className=' w-full h-[350px] overflow-hidden'>
                                <Image
                                    width={500}
                                    height={500}
                                    src={service?.image || demoImg}  // image change letter
                                    alt={service.title}
                                    className={` rounded-md w-full h-full hover:scale-110 duration-200`} here
                                />
                            </div>
                            <h2 className='cardTitle'>{service.title}</h2>
                            <p className=' text-[14px]'>{service.description}</p>

                            <Link href={"/profile"} className=' text-[15px] inline-block bg-blue-600  py-2 px-3 text-white font-medium my-5 rounded-md shadow-xl hover:shadow-none hover:mx-1 transition-all'>যোগ দিন
                            </Link>
                        </div>
                    ))
                }
            </div>
        </div>
    )
}
