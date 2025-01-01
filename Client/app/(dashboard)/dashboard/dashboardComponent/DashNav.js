"use client"
import Logo from '@/app/components/Globals/Logo'
import { contextApi } from '@/app/contextApi/Context'
import React, { useContext } from 'react'
import { MdMenu } from 'react-icons/md'

export default function DashNav() {

    const { dashArrowClick, setDashArrowClick } = useContext(contextApi)

    return (
        <div className=' fixed top-0 left-0 w-full bg-gray-100 z-[999] flex items-center justify-between px-5 py-2  '>
            <div className=' text-4xl font-bold italic'>
                <Logo />
            </div>
            <nav>
                <span onClick={() => setDashArrowClick(!dashArrowClick)} className=' text-5xl cursor-pointer'>
                    <MdMenu />
                </span>
            </nav>
        </div>
    )
}
