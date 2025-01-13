"use client";

import { deleteHandler } from "@/app/actions/users/deleteHandler";
import { questionDelete } from "@/app/constans/constans";
import { contextApi } from "@/app/contextApi/Context";
import { FormatedTime } from "@/app/helpers/FormatedTime";
import Link from "next/link";
import { useRouter } from "next/navigation";
import React, { useContext, useEffect, useState } from "react";
import DataTable from "react-data-table-component";
import { toast } from "react-toastify";

export default function QuestionTable({ data }) {
    const { setManageData } = useContext(contextApi)
    const [questionData, setQuestionData] = useState([])
    const [isClient, setIsClient] = useState(true);
    const router = useRouter();

    useEffect(() => {
        setQuestionData(data)
    }, []);


    // Define edit handler
    const handleEdit = (questionData) => {
        setManageData(questionData)
        router.push("/dashboard/questions/add")
        // alert("Under Proccesing . . .")
    };

    // Define delete handler
    const handleDelete = async (questionId) => {
        try {
            const deleteEndpoint = `${questionDelete + questionId}`
            const { status, result } = await deleteHandler(deleteEndpoint)
            if (status === 200) {
                toast.success(result.message)
                router.refresh()
            }
        } catch (error) {
            toast.error("Delete Failed!")
        }
    };

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
            selector: (row) =>FormatedTime( row.examTime),
            sortable: false,
        },
        {
            name: "Total Questions",
            selector: (row) => row.questions.length,
            sortable: true,
        },
        {
            name: "Edit",
            cell: (row) => (
                <button
                    className="bg-blue-500 text-white px-3 py-1 rounded hover:bg-blue-600"
                    onClick={() => handleEdit(row)}
                >
                    Edit
                </button>
            ),
        },
        {
            name: "Delete",
            cell: (row) => (
                <button
                    className="bg-red-500 text-white px-3 py-1 rounded hover:bg-red-600"
                    onClick={() => handleDelete(row._id)}
                >
                    Delete
                </button>
            ),

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
