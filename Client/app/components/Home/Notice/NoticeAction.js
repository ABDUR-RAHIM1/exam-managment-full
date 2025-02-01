"use client"
import { contextApi } from '@/app/contextApi/Context'
import { useRouter } from 'next/navigation'
import React, { useContext } from 'react'
import { FaEye } from "react-icons/fa";

export default function NoticeAction({ notice }) {

    const { setNoticeData } = useContext(contextApi)

    const router = useRouter();

    const handleShowNoticeModal = () => {
        setNoticeData(notice);
        router.push("/notice")
    }

    return (
        <>
            <button onClick={handleShowNoticeModal}> 
                <FaEye className='text-2xl text-blue-400'  />
            </button>


        </>
    )
}
