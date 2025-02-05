"use client"
import { bookMethodsAll } from '@/app/constans/constans';
import DeleteAction from '@/app/helpers/Actions/admin/DeleteAction';
import EditAction from '@/app/helpers/Actions/admin/EditAction';
import Image from 'next/image';
import React, { useEffect, useState } from 'react'
import DataTable from 'react-data-table-component';

export default function ManageBooks({ booksData }) {
    const [books, setBooks] = useState([]);

    useEffect(() => {
        if (booksData) {
            setBooks(booksData)
        }
    }, [booksData]);

    const columns = [
        {
            name: "#",
            selector: (row, index) => <span>{index + 1}</span>
        },
        {
            name: "Cover",
            selector: row => <Image
                width={1000}
                height={1000}
                src={row?.coverPhoto}
                alt={row.title}
                className=' w-20 h-20 rounded-md my-3'
            />
        },
        {
            name: "Book",
            selector: row => row.bookName || "N/A"
        },
        {
            name: "Title",
            selector: row => row.title
        },
        {
            name: "Edit",
            selector: row => <EditAction data={row} path={"/dashboard/content/books"} />
        },
        {
            name: "Delete",
            selector: row => <DeleteAction route={bookMethodsAll + row._id} />
        },
    ]

    return (
        <div>
            <DataTable
                title={"PDF BOOKS"}
                columns={columns}
                data={books}
                pagination
                highlightOnHover
            />
        </div>
    )
}
