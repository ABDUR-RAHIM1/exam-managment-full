"use client";
 
import { questionDelete } from "@/app/constans/constans"; 
import DeleteAction from "@/app/helpers/Actions/admin/DeleteAction";
import EditAction from "@/app/helpers/Actions/admin/EditAction";
import { FormatedTime } from "@/app/helpers/FormatedTime";
import Link from "next/link"; 
import React, { useEffect, useState } from "react";
import DataTable from "react-data-table-component"; 

export default function QuestionTable({ data }) { 
    const [questionData, setQuestionData] = useState([]) 

    useEffect(() => {
        if (data) {
            setQuestionData(data)
        }
    }, [data]);



    // Define columns for the data table
    const columns = [
        {
            name: "Category",
            selector: (row) => <Link className=" text-blue-500 hover:underline" href={`/dashboard/questions/all/${row._id}`}>
                {row.questionCategory}
            </Link>,
            sortable: true,
        },
        {
            name: "Title",
            selector: (row) => row.questionTitle,
            sortable: true,
        },
        {
            name: "Exam Date",
            selector: (row) =>
                new Date(row.examDate).toLocaleDateString("en-US"),
            sortable: true,
        },
        {
            name: "Exam Time",
            selector: (row) => FormatedTime(row.examTime),
            sortable: false,
        },
        {
            name: "Total Questions",
            selector: (row) => row.questions.length,
            sortable: true,
        },
        {
            name: "Edit",
            selector: (row) => <EditAction data={row} path={"/dashboard/questions/add"} />
        },
        {
            name: "Delete",
            selector: (row) => <DeleteAction route={questionDelete + row._id} />

        },
    ];

    return (
        <div className="p-4">
            <h2 className="text-2xl font-bold mb-4">Question Table</h2>
            <DataTable
                columns={columns}
                data={questionData}
                pagination
                highlightOnHover
                striped
                responsive

            />
        </div>
    );
}
