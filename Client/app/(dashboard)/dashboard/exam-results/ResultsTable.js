"use client"
import { adminRole, deleteResult } from '@/app/constans/constans'
import DeleteAction from '@/app/helpers/Actions/admin/DeleteAction'
import Cookies from 'js-cookie'
import Link from 'next/link'
import React, { useEffect, useState } from 'react'
import DataTable from 'react-data-table-component'

//  dashboard
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
            name: "নাম",
            selector: row => row.user?.name
        },
        // {
        //     name: "Category",
        //     selector: row => row.questionCategory
        // },
        {
            name: "কোর্স ",
            selector: row => row.questionTitle
        },
        {
            name: "স্কিপ ",
            selector: row => <p className='text-white bg-gray-800 border border-gray-600 px-2 font-bold rounded-md'>
                {row.skip || 0}
            </p>
        },
        {
            name: "সঠিক ",
            selector: row => <p className='text-green-700 bg-green-200 border border-green-500 px-2 font-bold rounded-md'>
                {row.rightAnswers}
            </p>
        },
        {
            name: "ভুল ",
            selector: row => <p className='text-red-700 bg-red-200 border border-red-500 px-2 font-bold rounded-md'>
                {row.wrongAnswers}
            </p>
        },
        {
            name: "মোট প্রশ্ন",
            selector: row => <p className='text-blue-800 bg-blue-200 border border-blue-500 px-2 font-bold rounded-md'>
                {row.wrongAnswers + row.rightAnswers + row.skip}
            </p>
        },
        {
            name: "পেয়েছে",
            selector: row => <p className='text-yellow-800 bg-yellow-400 border border-yellow-600 px-2 font-bold rounded-md'>
                {row.totalMark ? row.totalMark : "N/A"}
            </p>
        },
        {
            name: "পাস মার্ক ",
            selector: row => <p className='text-yellow-800 bg-yellow-400 border border-yellow-600 px-2 font-bold rounded-md'>
                {row.passMark ? row.passMark : "N/A"}
            </p>
        },
        {
            name: "রেজাল্ট ",
            selector: row => <span className={`${row.isPass ? "bg-green-600 hover:bg-green-700" : "bg-red-600 hover:bg-red-700"} p-2 px-3 text-white rounded-md inline-block`}>
                {
                    row.isPass ? "পাশ" : "ফেল"
                }
            </span>
        },
        {
            name: "নির্ধারিত সময়ে ",
            selector: row => <span className={`${row.atATime ? "bg-green-500" : " bg-red-500"} p-1 text-white`}>
                {
                    row.atATime ? "হ্যা" : "না"
                }
            </span>
        },
        {
            name: "বিস্তারিত",
            selector: row => <Link href={`/results/${row._id}`} className=' inline-block py-2 px-3 bg-blue-700 text-white rounded-md font-bold'>
                Details
            </Link>
        },
        role === "admin" &&
        {
            name: "ডিলিট ",
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
