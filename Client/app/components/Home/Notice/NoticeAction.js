"use client"
import { contextApi } from '@/app/contextApi/Context'
import React, { useContext } from 'react'
import { GoDownload } from 'react-icons/go'

export default function NoticeAction({ notice }) {

    const { setShowModal, setNoticeData } = useContext(contextApi)

    const handleShowNoticeModal = () => {
        setNoticeData(notice)
        setShowModal(true)
    }

    return (
        <>
            <button onClick={handleShowNoticeModal}>
                <GoDownload className='text-2xl text-blue-500' />

            </button>


        </>
    )
}
