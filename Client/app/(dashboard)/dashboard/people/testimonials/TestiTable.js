"use client";
import { deleteHandler } from '@/app/actions/users/deleteHandler';
import { deleteMyOpinion } from '@/app/constans/constans';
import { demoProfilePhoto } from '@/app/DemoData/DemoImg';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import React, { useEffect, useState } from 'react';
import DataTable from 'react-data-table-component';
import { toast } from 'react-toastify';

export default function TestiTable({ tableData }) {
    const router = useRouter()
    const [opinionData, setOpinionData] = useState([]);

    useEffect(() => {
        setOpinionData(tableData);
    }, [tableData]);

    // <+++++++++++ Opinion Delete handler For Admin ++++++++++++++>
    const handleDelete = async (id) => {
        try {
            const deleteApi = deleteMyOpinion + id

            const { status, result } = await deleteHandler(deleteApi);

            if (status === 200) {
                toast.success(result.message);
                router.refresh()
            } else {
                toast.error(result.message);
            }

        } catch (error) {
            console.log(error)
            toast.error("Failed To Delete!")
        }
    };

    const columns = [
        {
            name: 'User Name',
            selector: (row) => row.user?.name,
            sortable: true,
        },
        {
            name: 'User Photo',
            cell: (row) => (
                <Image
                    width={50}
                    height={50}
                    src={row.user?.photo || demoProfilePhoto}
                    alt={row.user?.name}
                    className="w-16 h-16 rounded-full my-3"
                />
            ),
        },
        {
            name: 'Opinion',
            selector: (row) =>
                row.opinion && row.opinion.length > 35
                    ? row.opinion.slice(0, 35) + ' . . .'
                    : row.opinion,
            wrap: true,
        },
        {
            name: 'Created At',
            selector: (row) => new Date(row.createdAt).toLocaleDateString(),
            sortable: true,
        },
        {
            name: 'Actions',
            cell: (row) => (
                <button
                    onClick={() => handleDelete(row._id)}
                    className='py-1 px-2 bg-red-500 text-white rounded-sm'
                >
                    Delete
                </button>
            ),
        },
    ];

    // Function to render the expanded row details
    const ExpandedComponent = ({ data }) => (
        <div className='py-4 px-3 bg-gray-200'>
            <p><strong>Opinion:</strong> {data.opinion}</p>
            <p><strong>Created At:</strong> {new Date(data.createdAt).toLocaleString()}</p>

        </div>
    );

    return (
        <div style={{ padding: '20px' }}>
            <h2 style={{ marginBottom: '20px', textAlign: 'center' }}>User Opinions</h2>
            <DataTable
                columns={columns}
                data={opinionData}
                pagination
                highlightOnHover
                responsive
                expandableRows
                expandableRowsComponent={ExpandedComponent}
            />
        </div>
    );
}
