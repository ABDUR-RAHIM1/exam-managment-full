"use client"
import { deleteCourseInfo, deleteWhy } from '@/app/constans/constans';
import DeleteAction from '@/app/helpers/Actions/admin/DeleteAction';
import EditAction from '@/app/helpers/Actions/admin/EditAction';
import Image from 'next/image';
import React, { useEffect, useState } from 'react'
import DataTable from 'react-data-table-component';

export default function ManageWhy({ whyInfo }) {
    const [whyInfoData, setWhyInfoData] = useState([]);

    useEffect(() => {
        setWhyInfoData(whyInfo)
    }, [whyInfo]);


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
                className=' w-20 h-20 rounded-md my-3'
            />
        },
        {
            name: "Title",
            selector: row => row.title
        },
        {
            name: "Edit",
            selector: row => <EditAction data={row} path={"/dashboard/content/why-choose"} />
        },
        {
            name: "Delete",
            selector: row => <DeleteAction route={deleteWhy + row._id} />
        },
    ]

    return (
        <div>
            <DataTable
                columns={columns}
                data={whyInfoData}
                pagination
                highlightOnHover
            />
        </div>
    )
}
