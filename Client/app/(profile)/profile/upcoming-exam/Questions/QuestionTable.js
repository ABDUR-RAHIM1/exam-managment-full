"use client"
import { FormatedTime } from '@/app/helpers/FormatedTime';
import Link from 'next/link';
import React, { useEffect, useState } from 'react'
import DataTable from 'react-data-table-component';

export default function QuestionTable({ questions }) {

    const [questionData, setQuestionData] = useState([]);
   
    useEffect(() => {
        if (questions) {
            setQuestionData(questions)
        }
    }, [questions]);

 
    const columns = [
        {
            name: "Action",
            selector: row => <Link href={`/profile/upcoming-exam/${row._id}`} className=' inline-block py-1 md:py-2 px-2 md:px-3 rounded-md border my-2 font-medium text-sm bg-blue-600 text-white'>
                পরীক্ষা দিন
            </Link>
        },
        {
            name: "Categoirie",
            selector: row => row.questionCategory
        },
        {
            name: "Exam",
            selector: row => row.questionTitle
        },
        {
            name: "Exam Date",
            selector: row => <p>
                {new Date(row.examDate).toLocaleDateString()} <small>{"(M/D/Y)"}</small>
            </p>
        },
        {
            name: "Start Time",
            selector: row => FormatedTime(row.examTime)
        },
        {
            name: "Duration",
            selector: row => row.examDuration
        },
        {
            name: "Totol Questions",
            selector: row => row.questions ? row.questions.length : 0
        },
    ]

    return (
        <div>
            <DataTable
                title={"আপনার পরীক্ষা সমূহ"}
                columns={columns}
                data={questionData}
                pagination
                highlightOnHover
                responsive
            />
        </div>
    )
}
