"use client" 
import Cookies from 'js-cookie'
import { useRouter } from 'next/navigation'
import React from 'react'

export default function UserLogOutBtn({setIsToken}) {
    const router = useRouter()
    const handleLogOut = () => {
        Cookies.remove("userToken")
        setIsToken(false)
        router.push("/")
    }

    return (
        <button onClick={handleLogOut} className=' w-full py-1 px-2 font-semibold text-center my-5 bg-red-800 rounded-md transition-all hover:bg-red-500 text-white'>লগ-আউট</button>
    )
}
