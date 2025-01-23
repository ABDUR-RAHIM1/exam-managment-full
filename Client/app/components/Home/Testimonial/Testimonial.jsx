"use client"
import React from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import 'swiper/css/pagination';
import { Pagination } from 'swiper/modules';
import { demoProfilePhoto } from '@/app/DemoData/DemoImg';
import Image from 'next/image';
import Heading from '@/app/helpers/Heading';
import NoDataFound from '../../Globals/NoDataFound';

export default function Reviews({ testimonialsData }) {

    const { status, result } = testimonialsData;

    if (status !== 200 || !result) {
        return <NoDataFound />
    }


    return (
        <div className='px-10 py-6'>
            {/* <h1 className='text-center text-2xl font-semibold mb-6'>গ্রাহকদের অভিজ্ঞতা</h1> */}
            <Heading text={"শিক্ষার্থীদের অভিজ্ঞতা"} center={true} />
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
                    {result && result.map((sl, index) => (
                        <SwiperSlide key={index}>
                            <div className='w-full h-auto bg-gray-50 rounded-lg p-5 shadow-lg border'>
                                <div className="flex justify-center">
                                    <Image className='w-20 h-20 rounded-full border-4 border-white shadow-lg'
                                        width={500}
                                        height={500}
                                        src={sl.user?.photo || demoProfilePhoto}
                                        alt={sl.user?.name}
                                    />
                                </div>
                                <div className='text-center mt-4'>
                                    <h2 className='text-lg font-medium text-gray-800'>{sl.user?.name}</h2>
                                    <p className='text-sm text-gray-600 my-3'>{sl.opinion}</p>
                                    <p className='text-xs text-gray-500'>{new Date(sl.createdAt).toLocaleDateString()}</p>
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

