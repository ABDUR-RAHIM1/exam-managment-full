"use client";
import { courseDelete } from '@/app/constans/constans';
import DeleteAction from '@/app/helpers/Actions/admin/DeleteAction';
import EditAction from '@/app/helpers/Actions/admin/EditAction';
import Link from 'next/link';
import React, { useEffect, useState } from 'react';
import DataTable from 'react-data-table-component';

export default function CourseTable({ courseData }) {
    const [data, setData] = useState([]);

    useEffect(() => {
        if (courseData) {
            setData(courseData)
        }
    }, [courseData]);
 


    const columns = [
        {
            name: 'Category',
            selector: row => (
                <Link
                    className="font-bold hover:text-blue-500 hover:underline transition-all"
                    href={`/dashboard/courses/${row._id}`}
                >
                    {row.category}
                </Link>
            ),
            sortable: true,
        },
        {
            name: 'Title',
            selector: row => row.title,
            sortable: true,
        },
        {
            name: 'Sold',
            selector: row => row.access?.length,
            sortable: true,
        },
        {
            name: 'Duration',
            selector: row => row.duration,
            sortable: true,
        },
        {
            name: 'Regular Price',
            selector: row => `৳${row.regularPrice}`,
            sortable: true,
        },
        {
            name: 'Offer Price',
            selector: row => `৳${row.offerPrice}`,
            sortable: true,
        },
        {
            name: ' Edit',
            selector: row => <EditAction data={row} path={"/dashboard/courses/add"} />
        },

        {
            name: ' Delete',
            selector: row => <DeleteAction route={courseDelete + row._id} />
        },
    ];


    return (
        <div className="p-4 rounded shadow-md">
            <h2 className="text-xl font-bold mb-4">Courses List</h2>
            <DataTable
                columns={columns}
                data={data}
                pagination
                highlightOnHover
                striped
            />
        </div>
    );
}
