"use client"
import React, { useContext } from 'react'
import { contextApi } from '../contextApi/Context'
import Image from 'next/image'
import noticeDemo from "@/public/Images/notice.jpg"
import { MdClose } from 'react-icons/md'
export default function NoticeModal() {
    const { showModal, setShowModal, noticeData } = useContext(contextApi);
 
    return (
        <div className={` ${showModal ? "block" : "hidden"} bg-black bg-opacity-90 fixed top-0 left-0 right-0 z-50 w-full p-4 overflow-hidden  md:inset-0`}>

            <div className=" px-2 md:px-5 pt-[100px] md:pt-[150px] w-full md:w-[80%] m-auto h-screen  relative bg-white rounded-lg shadow-sm dark:bg-gray-700">
                <div className=' flex itce justify-end'>
                    <MdClose onClick={() => setShowModal(false)} className=' text-3xl border text-red-500 border-red-400 cursor-pointer' />
                </div>

                <h2 className=' text-center my-3 text-blue-600'>Notice</h2>
                <Image
                    src={noticeData || noticeDemo}
                    alt='tickmarkq notice'
                    width={1000}
                    height={1000}
                    className=' w-auto h-auto rounded-md'
                />


            </div>
        </div>
    )
}
