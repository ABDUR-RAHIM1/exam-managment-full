"use client"
import React from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import 'swiper/css/pagination';
import { Pagination } from 'swiper/modules';
import { demoImg2, demoImg3 } from '@/app/DemoData/DemoImg';
import Image from 'next/image';

function Reviews() {
    // Sample testimonials data
    const testimonials = [
        {
            image: demoImg3,
            name: "John Doe",
            feedback: "This platform helped me prepare for my exams in a structured and efficient way. The materials are top-notch!",
            date: "2024-09-15"
        },
        {
            image: demoImg2,
            name: "Jane Smith",
            feedback: "I loved the flexibility of learning at my own pace. The mock tests were really helpful in building my confidence.",
            date: "2024-09-20"
        },
        {
            image: demoImg3,
            name: "Michael Johnson",
            feedback: "The study resources are comprehensive and up to date. I couldn't have done better without them!",
            date: "2024-09-25"
        },
        {
            image: demoImg2,
            name: "Michael Johnson",
            feedback: "The study resources are comprehensive and up to date. I couldn't have done better without them!",
            date: "2024-09-25"
        },
        {
            image: demoImg2,
            name: "Michael Johnson",
            feedback: "The study resources are comprehensive and up to date. I couldn't have done better without them!",
            date: "2024-09-25"
        },
        {
            image: demoImg3,
            name: "Michael Johnson",
            feedback: "The study resources are comprehensive and up to date. I couldn't have done better without them!",
            date: "2024-09-25"
        },
        {
            image: demoImg3,
            name: "Michael Johnson",
            feedback: "The study resources are comprehensive and up to date. I couldn't have done better without them!",
            date: "2024-09-25"
        },
    ];

    return (
        <div className='px-10 py-6'>
            <h1 className='text-center text-2xl font-semibold mb-6'>What Our Users Say</h1>
            <div className="reviews">
                <Swiper
                    slidesPerView={3}
                    spaceBetween={30}
                    pagination={{
                        clickable: true,
                    }}
                    breakpoints={{
                        200: {
                            slidesPerView: 1,
                            spaceBetween: 20,
                        },
                        640: {
                            slidesPerView: 2,
                            spaceBetween: 20,
                        },
                        768: {
                            slidesPerView: 2,
                            spaceBetween: 30,
                        },
                        1024: {
                            slidesPerView: 3,
                            spaceBetween: 40,
                        },
                    }}
                    modules={[Pagination]}
                    className="mySwiper"
                >
                    {testimonials.map((sl, index) => (
                        <SwiperSlide key={index}>
                            <div className='w-full h-auto bg-gray-50 rounded-lg p-5 shadow-lg border'>
                                <div className="flex justify-center">
                                    <Image className='w-20 h-20 rounded-full border-4 border-white shadow-lg'
                                        width={500}
                                        height={500}
                                        src={sl.image}
                                        alt={sl.name}
                                    />
                                </div>
                                <div className='text-center mt-4'>
                                    <h2 className='text-lg font-medium text-gray-800'>{sl.name}</h2>
                                    <p className='text-sm text-gray-600 my-3'>{sl.feedback}</p>
                                    <p className='text-xs text-gray-500'>{sl.date}</p>
                                </div>
                            </div>
                        </SwiperSlide>
                    ))}
                </Swiper>
                <hr className='my-5 border-gray-200' />
            </div>
        </div>
    )
}

export default Reviews;
