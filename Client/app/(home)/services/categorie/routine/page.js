"use client"
import Image from 'next/image';
import { useSearchParams } from 'next/navigation';
import React from 'react'

export default function Routine() {
    const searchParams = useSearchParams();
    const routine = searchParams.get("routine")

    return (
        <div className=' w-full'>
            {
                routine ?
                    <Image
                        src={routine}
                        width={1000}
                        height={1000}
                        alt='Exam Routine'
                        className='w-auto h-auto'
                    />
                    : <h2 className=' text-red-500'>Routine Not found!</h2>
            }
        </div>
    )
}
