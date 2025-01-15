"use client"
import React, { useEffect, useState } from 'react'
import { Fade } from 'react-slideshow-image';
import 'react-slideshow-image/dist/styles.css';

import Image from 'next/image';
import { slider1, slider2, slider3, slider4 } from '@/app/DemoData/DemoImg';
import { getSliders } from './getSliders';

export default function Slider() {

    const [status, setStatus] = useState(0)
    const [sliders, setSliders] = useState([]);

    useEffect(() => {
        const getData = async () => {
            const { status, result } = await getSliders();
            setStatus(status)
            if (status === 200) {
                setSliders(result)
            }
        };

        getData()
    }, [])

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
                {
                    status === 200 ?

                        (
                            sliders.map((fadeImage, index) => (
                                <div
                                    key={index}
                                    className='relative flex flex-col md:flex-row h-[35vh] md:h-[70vh] bg-gray-200'
                                >
                                    {/* Image Section (70%) */}
                                    <div className="w-full  h-full">
                                        <Image
                                            src={fadeImage.slider}
                                            alt={fadeImage.title}
                                            width={1000}
                                            height={1000}
                                            className='w-full h-full '
                                        />
                                    </div>

                                    <div className=' bg-black bg-opacity-90 px-5 py-3 absolute bottom-5 left-[45%] rounded-md'>
                                        <h3>
                                            {fadeImage.title}
                                        </h3>
                                    </div>

                                </div>
                            ))
                        )
                        : (
                            slideImages.map((fadeImage, index) => (
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

                                </div>
                            ))
                        )

                }
            </Fade>
        </div>
    )
}
