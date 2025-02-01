"use client"
import { contextApi } from '@/app/contextApi/Context'
import Image from 'next/image'
import React, { useContext } from 'react'

export default function NoticeBoard() {
    const { noticeData } = useContext(contextApi)
    return (
        <div className='w-full min-h-screen flex items-center justify-center'>
            <Image
                src={noticeData}
                width={1000}
                height={1000}
                alt='tickmarkq notice'
                className=' w-auto h-auto'
            />
        </div>
    )
}
