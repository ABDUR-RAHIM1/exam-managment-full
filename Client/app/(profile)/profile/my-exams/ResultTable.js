"use client"
import Link from 'next/link'
import React, { useEffect, useState } from 'react'
import DataTable from 'react-data-table-component'
import { MdDownload } from 'react-icons/md'

export default function ResultTable({ data }) {
    const [isClient, setIsClient] = useState(true)
    useEffect(() => {
        setIsClient(!isClient)
    }, [])


    const columns = [
        {
            name: "Category",
            selector: row => row.questionCategory
        },
        {
            name: "Course",
            selector: row => row.questionTitle
        },
        {
            name: "Right A",
            selector: row => <p className=' text-green-600 bg-green-100 px-2 font-bold'>
                {row.rightAnswers}
            </p>
        },
        {
            name: "Wrong A",
            selector: row => <p className=' text-red-600 bg-red-100 px-2 font-bold'>
                {row.wrongAnswers}
            </p>
        },
        {
            name: "Total Q",
            selector: row => <p className=' text-blue-600 bg-blue-100 px-2  font-bold'>
                {row.wrongAnswers + row.rightAnswers}
            </p>
        },
        {
            name: "Total Mark",
            selector: row => <p className='text-yellow-600 bg-yellow-200 px-2 font-bold'>
                {row.totalMark ? row.totalMark : "N/A"}
            </p>
        },
        {
            name: "View",
            selector: row => <Link href={`/results/${row._id}`} className=' inline-block py-1 px-2 bg-blue-700 text-white rounded-sm'>
                Details
            </Link>
        },
        {
            name: "Download",
            selector: row => <Link href={`/results/pdf/${row._id}`} className=' flex items-center gap-1 py-1 px-2 bg-blue-500 text-white rounded-sm'>
                PDF <MdDownload className='' />
            </Link>
        },
    ]

    if (isClient) {
        return "Loading . . . "
    }
    return (
        <div className="p-4 bg-white rounded shadow-md">
            <h2 className="text-xl font-bold mb-4">Results</h2>
            <DataTable
                columns={columns}
                data={data}
                pagination
                highlightOnHover
                striped
            />
        </div>
    )
}
