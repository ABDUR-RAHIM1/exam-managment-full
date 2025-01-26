"use client"
import { deleteAdminModaretor } from '@/app/constans/constans';
import { demoProfilePhoto } from '@/app/DemoData/DemoImg';
import DeleteAction from '@/app/helpers/Actions/admin/DeleteAction';
import EditAction from '@/app/helpers/Actions/admin/EditAction';
import Image from 'next/image';
import React, { useEffect, useState } from 'react'
import DataTable from 'react-data-table-component';

export default function ModaretorListTable({ data }) {
    const [modaretorList, setModaretorList] = useState([]);

    useEffect(() => {
        if (data) {
            setModaretorList(data)
        }
    }, [data]);

    const columns = [
        {
            name: "#",
            selector: (row, index) => index + 1
        },
        {
            name: "Photo",
            selector: (row) => <Image
                src={row.photo || demoProfilePhoto}
                alt='tickmarkq '
                width={100}
                height={100}
                className=' w-16 h-16 rounded-md my-3 '
            />
        },
        {
            name: "email",
            selector: (row) => row.email
        },
        {
            name: "email",
            selector: (row) => row.email
        },
        {
            name: "role",
            selector: (row) => row.role
        },
        {
            name: "Edit",
            selector: (row) => <EditAction data={row} path={"/dashboard/people/add-modaretor"} />
        },
        {
            name: "Delete",
            selector: (row) => <DeleteAction route={deleteAdminModaretor + row._id} />
        },
    ]

    return (
        <div>
            <DataTable
                title={"Admin / Modaretor List"}
                columns={columns}
                data={modaretorList}
                pagination
                striped
                highlightOnHover
            />
        </div>
    )
}
