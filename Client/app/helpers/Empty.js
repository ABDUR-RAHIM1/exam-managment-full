import React from 'react'

export default function Empty({text}) {
    return (
        <div className='w-full h-[40vh] p-4 font-semibold flex items-center justify-center text-red-500'> 
            {
                text || "খুঁজে পাওয়া যায়নি!"
            }
        </div>
    )
}
