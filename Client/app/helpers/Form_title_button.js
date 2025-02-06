"use client"
import React, { useContext } from 'react'
import { contextApi } from '../contextApi/Context'

export default function Form_title_button({ text }) {
    const { manageData, setManageData } = useContext(contextApi);
    const isEditable = manageData && Object.keys(manageData).length > 0


    const handleClearData = () => {
        setManageData(null)
    }

    return (
        <div className=' flex items-center justify-center gap-2 my-4'>
            <h1 className="text-2xl font-bold text-center"> {isEditable ? "Edit" : "Post"} {
                text || "The Form"
            }
            </h1>
            {isEditable &&
                <button onClick={handleClearData} className='py-1 px-2 rounded-md mx-2 border border-gray-400 bg-gray-200 text-sm font-bold'>Add Mood</button>}
        </div>
    )
}
