"use client"
import { FormatedTime } from '@/app/helpers/FormatedTime';
import Link from 'next/link';
import React, { useEffect, useState } from 'react'
import DataTable from 'react-data-table-component';

export default function QuestionTable({ questions, title }) {

    const [questionData, setQuestionData] = useState([]);

    useEffect(() => {
        if (questions) {
            setQuestionData(questions)
        }
    }, [questions]);

    const columns = [
        {
            name: "Action",
            selector: row => <Link href={`/profile/upcoming-exam/${row._id}`}
                className='inline-block py-1 md:py-2 px-2 md:px-3 rounded-md border my-2 font-medium text-[12px] bg-blue-600 text-white hover:bg-blue-700 transition'>
                পরীক্ষা দিন
            </Link>
        },
        // {
        //     name: "Categoirie",
        //     selector: row => <span className='font-semibold text-gray-700'>{row.questionCategory}</span>
        // },
        // {
        //     name: "Exam",
        //     selector: row => <span className='font-medium text-gray-900'>{row.questionTitle}</span>
        // },
        {
            name: "Exam Date",
            selector: row => <p className='text-red-600 font-semibold'>
                {new Date(row.examDate).toLocaleDateString()} <small className='text-gray-500'>{"(M/D/Y)"}</small>
            </p>
        },
        {
            name: "Start Time",
            selector: row => <span className='bg-green-200 text-green-800 px-2 py-1 rounded-md font-semibold'>
                {FormatedTime(row.examTime)}
            </span>
        },
        {
            name: "Duration",
            selector: row => <span className='bg-yellow-200 text-yellow-800 px-2 py-1 rounded-md font-semibold'>
                {row.examDuration} মিনিট
            </span>
        },
        {
            name: "Total Questions",
            selector: row => <span className='bg-blue-200 text-blue-800 px-2 py-1 rounded-md font-semibold'>
                {row.questions ? row.questions.length : 0}
            </span>
        },
    ]

    return (
        <div className='my-5'>
            <DataTable
                title={title || "আপনার পরীক্ষা সমূহ"}
                columns={columns}
                data={questionData}
                pagination
                highlightOnHover
                responsive
            />
        </div>
    )
}
