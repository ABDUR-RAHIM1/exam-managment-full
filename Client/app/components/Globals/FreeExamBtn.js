import Link from 'next/link'
import React from 'react'

export default function FreeExamBtn({ path }) {
    const pathName = path || "/free-exam"
    return (
        <Link href={pathName} className=' inline-block text-center w-full py-2 bg-green-500 text-white my-2 rounded-sm font-bold tracking-wider shadow-md hover:shadow-none transition-all'>
            Exam Now
        </Link>
    )
}
