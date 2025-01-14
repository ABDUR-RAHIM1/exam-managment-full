"use client"
import { deleteHandler } from '@/app/actions/users/deleteHandler'
import Loading from '@/app/components/Globals/Loading'
import { adminRole, deleteResult } from '@/app/constans/constans'
import Cookies from 'js-cookie'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import React, { useEffect, useState } from 'react'
import DataTable from 'react-data-table-component'
import { MdDelete } from 'react-icons/md'
import { toast } from 'react-toastify'

export default function ResultsTable({ data }) {
    const router = useRouter();
    const [status, setStatus] = useState("atATime")
    const [resultData, setResultData] = useState([])
    const [filteredData, setFilteredData] = useState([])

    const role = Cookies.get(adminRole);

    useEffect(() => {
        setResultData(data)
    }, [])

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


    //  delete Handler if need for admin (only for admin not modaretor)

    const handleDeleteResult = async (resultId) => {
        try {
            // porobortite admin handler use korte hobe 
            const { status, result } = await deleteHandler(deleteResult + resultId);

            if (status === 200 || status === 201) {
                toast.success(result.message);
                router.refresh()
            } else {
                toast.error(result.message)
            }

        } catch (error) {
            console.log(error)
            toast.error("Failed To Delete!")
        }
    }


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
            selector: row => <button onClick={() => handleDeleteResult(row._id)}>
                <MdDelete className=' text-3xl text-red-500 bg-red-200 p-1' />
            </button>
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
