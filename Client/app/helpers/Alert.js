"use client"
import Link from 'next/link'
import React from 'react'
import { MdClose } from 'react-icons/md'

export default function Alert({ handleCloseAlert }) {
    return (
        <div className=' px-4 w-full py-10  bg-opacity-0 absolute top-0 left-[50%] translate-x-[-50%] z-50'>

            <div className=' w-full md:w-[50%] m-auto py-5 px-4 rounded-md border border-red-500 bg-red-100 text-red-500 text-center'>
                <div className=' flex items-center justify-end'>
                    <MdClose onClick={handleCloseAlert} className=' text-3xl  border border-red-400 cursor-pointer' />
                </div>
                <h2 className=' text-2xl font-semibold text-red-600 text-center my-2'>আপনি এখনো লগইন করেননি !</h2>
                <p className='text-sm hidden md:block text-blue-600'> লগইন করতে ডান দিকের লগইন বাটন এ ক্লিক করুন।</p>
                <p className='text-sm block md:hidden text-blue-600'>  লগইন করতে ডান দিকের থ্রি ডট এ লগইন বাটন এ ক্লিক করুন।</p>
                <p className=' text-xl font-bold my-2'>অথবা</p>
                <Link onClick={handleCloseAlert} href={"/auth"} className=' my-2 bg-blue-600 text-white rounded-md shadow-md rmd font-medium text-sm inline-block py-2 px-3'>
                    <button>
                        এখানে ক্লিক করুন।
                    </button>
                </Link>
            </div>
            /</div>
    )
}
