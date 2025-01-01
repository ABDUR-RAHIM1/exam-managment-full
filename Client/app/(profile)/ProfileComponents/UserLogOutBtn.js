"use client"
import { userTokenName } from '@/app/constans/constans'
import Cookies from 'js-cookie'
import { useRouter } from 'next/navigation'
import React from 'react'

export default function UserLogOutBtn() {
    const router = useRouter()
    const handleLogOut = () => {
        Cookies.remove("userToken")
        router.push("/")
    }

    return (
        <button onClick={handleLogOut} className=' w-full py-3 px-4 font-bold text-center my-7 bg-red-600 rounded-md transition-all hover:bg-red-800 text-white'>LogOut</button>
    )
}
