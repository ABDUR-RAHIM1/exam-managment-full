"use client"
import { deleteNotice } from '@/app/constans/constans';
import DeleteAction from '@/app/helpers/Actions/admin/DeleteAction';
import EditAction from '@/app/helpers/Actions/admin/EditAction';
import Image from 'next/image';
import React, { useEffect, useState } from 'react';
import DataTable from 'react-data-table-component';

const ManageNotice = ({ notices }) => {

    const [noticeData, setNoticeData] = useState([]);

    useEffect(() => {
        if (notices) {
            setNoticeData(notices);
        }
    }, [notices]);
  
    const columns = [
        {
            name: 'Title',
            selector: row => row.title,
        },
        {
            name: 'Image',
            cell: (row) => (
                <Image
                    width={100} 
                    height={100}
                    src={row.notice}
                    alt={row.title}
                    className="w-20 h-20 my-5 rounded-md"
                />
            ),
        },
        {
            name: 'Created At',
            selector: row => new Date(row.createdAt).toLocaleString(),
        },
        {
            name: 'Edit',
            cell: (row) => <EditAction data={row} path="/dashboard/content/notice-board" />,
        },
        {
            name: 'Delete',
            cell: (row) => <DeleteAction route={deleteNotice + row._id} />,
        },
    ];

    return (
        <div className="min-h-screen bg-gray-100 p-6">
            <div className="bg-white p-6 rounded-lg shadow-lg">
                {/* DataTable for notices */}
                <DataTable
                    title="Manage Notices"
                    columns={columns}
                    data={noticeData}
                    pagination
                />
            </div>
        </div>
    );
};

export default ManageNotice;
