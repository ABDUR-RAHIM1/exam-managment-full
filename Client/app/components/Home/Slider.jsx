"use client"
import React from 'react'
import { Fade } from 'react-slideshow-image';
import 'react-slideshow-image/dist/styles.css';

import Image from 'next/image';
import { slider1, slider2, slider3, slider4 } from '@/app/DemoData/DemoImg';

export default function Slider() {

    const slideImages = [
        {
            url: slider4,
            caption: "Bank Job Preparation",
            buttonText: "Learn More"
        },
        {
            url: slider2,
            caption: "NTRC Job Preparation",
            buttonText: "Explore Now"
        },
        {
            url: slider3,
            caption: "BCS Job Preparation",
            buttonText: "Start Today"
        },
        {
            url: slider1,
            caption: "BCS Job Preparation",
            buttonText: "Start Today"
        },
    ];

    return (
        <div className="w-full z-[-1]">
            <Fade>
                {slideImages.map((fadeImage, index) => (
                    <div
                        key={index}
                        className='relative flex flex-col md:flex-row h-[35vh] md:h-[70vh] bg-gray-200'
                    >
                        {/* Image Section (70%) */}
                        <div className="w-full  h-full">
                            <Image
                                src={fadeImage.url}
                                alt={fadeImage.caption}
                                width={1000}
                                height={1000}
                                className='w-full h-full '
                            />
                        </div>

                        {/* Text Section (30%) */}
                        {/* <div className="w-full md:w-[30%] h-full flex flex-col justify-center items-start bg-gray-200 text-white p-5">
                            <h2 className="text-lg md:text-2xl lg:text-3xl font-bold mb-4">
                                {fadeImage.caption}
                            </h2>
                            <p className="text-sm md:text-base lg:text-lg mb-6">
                                Unlock your potential with professional preparation. Start your journey now!
                            </p>
                            <button className="px-4 py-2 bg-blue-500 hover:bg-blue-600 rounded">
                                {fadeImage.buttonText}
                            </button>
                        </div> */}
                    </div>
                ))}
            </Fade>
        </div>
    )
}
