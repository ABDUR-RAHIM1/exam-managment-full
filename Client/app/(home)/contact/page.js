"use client"
import Image from 'next/image'
import React from 'react'

import contactPhoto from "@/public/Images/contact.jpg"

export default function Contact() {


    const handleSubmit = (e) => {
        e.preventDefault();
        alert("আপনার মেসেজ গ্রহণ করা হয়েছে , আপনার সাথে যোগাযোগ করা হবে। ")
    }


    return (
        <div className=' px-3 w-full min-h-screen bg-gray-200 flex items-center justify-center'>
            <div className=' w-full md:w-[90%] rounded-md shadow-xl flex items-center justify-between flex-wrap bg-white py-5 px-2 md:px-4'>

                <div className=' w-full md:w-[48%]'>
                    <Image
                        src={contactPhoto}
                        alt='Tickmarkq contact'
                        width={1000}
                        height={1000}
                        className='w-f h-full'
                    />
                </div>
                <div className=' w-full md:w-[50%]'>
                    <h2 className='text-xl md:text-2xl font-bold my-3  text-blue-600'>Contact us</h2>
                    <form onSubmit={handleSubmit}>
                        <div className=' my-3'>
                            <label htmlFor="name"> Name</label>
                            <input
                                type="text"
                                name='name'
                                placeholder='your Name'
                                required
                                className='input'
                            />
                        </div>
                        <div className=' my-3'>
                            <label htmlFor="email"> Email</label>
                            <input
                                type="email"
                                name='email'
                                placeholder='your email'
                                required
                                className='input'
                            />
                        </div>
                        <div className=' my-3'>
                            <label htmlFor="subject"> Subject</label>
                            <input
                                type="text"
                                name='subject'
                                placeholder='Enter Subject'
                                required
                                className='input'
                            />
                        </div>
                        <div className=' my-3'>
                            <label htmlFor="subject"> Message</label>
                            <textarea
                                rows={5}
                                name='message'
                                placeholder='Write Message'
                                required
                                className='input'
                            />
                        </div>
                        <button className=' w-full px-3 py-2 bg-blue-600 text-white rounded-md my-3 font-medium shadow-md transition-all hover:bg-blue-900'>Submit</button>
                    </form>
                </div>

            </div>
        </div>
    )
}
