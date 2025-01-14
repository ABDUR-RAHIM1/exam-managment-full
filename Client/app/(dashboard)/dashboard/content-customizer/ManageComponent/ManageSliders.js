"use client"
import { deleteHandler } from '@/app/actions/users/deleteHandler';
import { deleteSliders } from '@/app/constans/constans';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import React, { useEffect, useState } from 'react'
import DataTable from 'react-data-table-component';
import { MdDelete, MdEdit } from 'react-icons/md';
import { toast } from 'react-toastify';

export default function ManageSliders({ sliders }) {
    const router = useRouter()
    const [slidersData, setSlidersData] = useState([]);

    useEffect(() => {
        if (sliders) {
            const { status, result } = sliders
            setSlidersData(result);
        }
    }, []);

    const handleDeleteSlider = async (id) => {
        try {
            const { status, result } = await deleteHandler(deleteSliders + id);

            if (status === 200) {
                toast.success(result.message);
                router.refresh()
            } else {
                toast.error(result.message)
            }

        } catch (error) {
            toast.error("Failed To Delete!")
        }
    }

    const columns = [
        {
            name: "#",
            selector: (row, index) => <span>{index + 1}</span>
        },
        {
            name: "Slider",
            selector: row => row.slider ? (
                <Image
                    width={500}
                    height={500}
                    src={row.slider}
                    alt={row.title}
                    className='w-[80px] h-[80px] my-4 rounded-sm'
                />
            ) : (
                <span>No Image</span>
            )
        },
        {
            name: "Title",
            selector: row => row.title || "N/A"
        },
        {
            name: "Edit",
            selector: row => <button>
                <MdEdit className='text-3xl p-1 rounded-sm bg-blue-200 text-blue-500' />
            </button>
        },
        {
            name: "Delete",
            selector: row => <button onClick={() => handleDeleteSlider(row._id)}>
                <MdDelete className='text-3xl p-1 rounded-sm bg-red-200 text-red-500' />
            </button>
        },
    ]

    return (
        <div>
            <DataTable
                columns={columns}
                data={slidersData}
                pagination
                highlightOnHover
            />
        </div>
    )
}
