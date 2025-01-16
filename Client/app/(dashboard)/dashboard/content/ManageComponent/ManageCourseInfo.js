"use client"
import { deleteCourseInfo } from '@/app/constans/constans';
import DeleteAction from '@/app/helpers/Actions/admin/DeleteAction';
import EditAction from '@/app/helpers/Actions/admin/EditAction';
import Image from 'next/image';
import React, { useEffect, useState } from 'react'
import DataTable from 'react-data-table-component';

export default function ManageCourseInfo({ info }) {
    const [courseInfo, setCourseInfo] = useState([]);

    useEffect(() => {
        setCourseInfo(info)
    }, [info]);


    const columns = [
        {
            name: "#",
            selector: (row, index) => <span>{index + 1}</span>
        },
        {
            name: "Photo",
            selector: row => <Image
                width={500}
                height={500}
                src={row?.photo}
                alt={row.title}
                className=' w-20 h-20 rounded-md md-3'
            />
        },
        {
            name: "Title",
            selector: row => row.title
        },
        {
            name: "Button",
            selector: row => <button className='py-2 px-3 bg-blue-300 rounded-sm'>
                {row.btnText}
            </button>
        },
        {
            name: "Edit",
            selector: row => <EditAction data={row} path={"/dashboard/content/course-info"} />
        },
        {
            name: "Delete",
            selector: row => <DeleteAction route={deleteCourseInfo + row._id} />
        },
    ]

    return (
        <div>
            <DataTable
                columns={columns}
                data={courseInfo}
                pagination
                highlightOnHover
            />
        </div>
    )
}
