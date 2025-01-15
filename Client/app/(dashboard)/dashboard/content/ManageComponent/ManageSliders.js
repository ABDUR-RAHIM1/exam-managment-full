"use client" 
import { deleteSliders } from '@/app/constans/constans';  
import DeleteAction from '@/app/helpers/Actions/admin/DeleteAction';
import EditAction from '@/app/helpers/Actions/admin/EditAction';
import Image from 'next/image'; 
import React, { useEffect, useState } from 'react'
import DataTable from 'react-data-table-component'; 

export default function ManageSliders({ sliders }) {
 
    const [slidersData, setSlidersData] = useState([]);

    useEffect(() => {
        if (sliders) {
            setSlidersData(sliders);
        }
    }, [sliders]);

 
 

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
            selector: row => <EditAction data={row} path={"/dashboard/content/sliders"} />
        },
        {
            name: "Delete",
            selector: row => <DeleteAction route={deleteSliders + row._id} />
        },
    ]

    return (
        <div className=' bg-gray-100 md:p-5'>
            <DataTable
                title={"Manage Sliders"}
                columns={columns}
                data={slidersData}
                pagination
                highlightOnHover
            />
        </div>
    )
}
