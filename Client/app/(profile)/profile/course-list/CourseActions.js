"use client"
import { contextApi } from '@/app/contextApi/Context'
import { useRouter } from 'next/navigation'
import React, { useContext } from 'react'

export default function CourseActions(props) {
    const router = useRouter()
    const { setManageData } = useContext(contextApi)
    const { routinee, path } = props
    const handleRoutineeClick = (routinee) => {

        const pathname = path || "/profile/routine"

        router.push(pathname)
        setManageData(routinee)
    }
    return (
        <button onClick={() => handleRoutineeClick(routinee)} className='font-bold max-h-full bg-yellow-500 py-3 px-4 rounded-md transition-all hover:shadow-md'>
            Routinee
        </button>
    )
}
