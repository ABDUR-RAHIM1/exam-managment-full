"use client"
import { adminRole, deleteResult } from '@/app/constans/constans'
import DeleteAction from '@/app/helpers/Actions/admin/DeleteAction'
import Cookies from 'js-cookie'
import Link from 'next/link'
import React, { useEffect, useState } from 'react'
import DataTable from 'react-data-table-component'

export default function ResultsTable({ data }) {
    const [status, setStatus] = useState("atATime")
    const [resultData, setResultData] = useState([])
    const [filteredData, setFilteredData] = useState([])

    const role = Cookies.get(adminRole);

    useEffect(() => {
        if (data) {
            setResultData(data)
        }
    }, [data])

    useEffect(() => {
        if (status === "atATime") {
            const isAtAtime = resultData && resultData.filter(result => result.atATime);
            setFilteredData(isAtAtime);
        } else if (status === "late") {
            const isNotAtime = resultData && resultData.filter(result => !result.atATime);
            setFilteredData(isNotAtime);
        } else if (status === "all" || status === "") {
            setFilteredData(resultData);
        }
    }, [status, resultData]);



    const columns = [
        {
            name: "Name",
            selector: row => row.user?.name
        },
        {
            name: "Category",
            selector: row => row.questionCategory
        },
        {
            name: "Course",
            selector: row => row.questionTitle
        },
        {
            name: "Skip",
            selector: row => <p className=' text-black-600 bg-black text-white px-2 font-bold rounded-md'>
                {row.skip || 0}
            </p>
        },
        {
            name: "Right A",
            selector: row => <p className=' text-green-600 bg-green-100 px-2 font-bold rounded-md'>
                {row.rightAnswers}
            </p>
        },
        {
            name: "Wrong A",
            selector: row => <p className=' text-red-600 bg-red-100 px-2 font-bold rounded-md'>
                {row.wrongAnswers}
            </p>
        },
        {
            name: "Total Q",
            selector: row => <p className=' text-blue-600 bg-blue-100 px-2  font-bold rounded-md'>
                {row.wrongAnswers + row.rightAnswers}
            </p>
        },
        {
            name: "Total Mark",
            selector: row => <p className='text-yellow-600 bg-yellow-200 px-2 font-bold rounded-md'>
                {row.totalMark ? row.totalMark : "N/A"}
            </p>
        },
        {
            name: "Status",
            selector: row => <span className={`${row.atATime ? "bg-green-500" : " bg-red-500"} p-1 text-white`}>
                {
                    row.atATime ? "Yes" : "No"
                }
            </span>
        },
        {
            name: "View",
            selector: row => <Link href={`/results/${row._id}`} className=' inline-block py-2 px-3 bg-blue-700 text-white rounded-md font-bold'>
                Details
            </Link>
        },
        role === "admin" &&
        {
            name: "Delete",
            selector: row => <DeleteAction route={deleteResult + row._id} />
        },

    ]
    return (
        <div className="p-4  rounded shadow-md">
            <div className=' flex items-center justify-between my-5 flex-wrap gap-3'>
                <h2 className="text-xl font-bold mb-4">All Results</h2>
                <div className=' w-full md:w-[40%]'>
                    <select onChange={(e) => setStatus(e.target.value)} name="status" id="status" className='input'>
                        <option value="">Filter On Status</option>
                        <option value="atATime">On Time Completed</option>
                        <option value="late">Late Completion</option>
                        <option value="all">All</option>
                    </select>
                </div>
            </div>
            <DataTable
                columns={columns}
                data={filteredData}
                pagination
                highlightOnHover
                striped
            />
        </div>
    )
}
