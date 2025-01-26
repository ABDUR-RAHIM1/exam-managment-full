"use client";

import { deleteUser } from "@/app/constans/constans";
import { demoProfilePhoto } from "@/app/DemoData/DemoImg";
import DeleteAction from "@/app/helpers/Actions/admin/DeleteAction";
import Image from "next/image";
import React, { useEffect, useState } from "react";
import DataTable from "react-data-table-component";
import { MdDelete } from "react-icons/md";

export default function UserTable({ data }) {
    const [userData, setUserData] = useState([]);

    useEffect(() => {
        setUserData(data); // Set initial data
    }, [data]);

    // Define table columns
    const columns = [
        {
            name: "Photo",
            cell: (row) => (
                <Image
                    width={50}
                    height={50}
                    src={row.photo || demoProfilePhoto}
                    alt="User Photo"
                    className="w-16 h-16 rounded-md my-3"
                />
            )
        },
        {
            name: "Name",
            selector: (row) => row.name,
            sortable: true,
        },
        {
            name: "Email/Phone",
            selector: (row) => row.emailPhone,
            sortable: true,
        },

        {
            name: "College",
            selector: (row) => row.collage,
        },
        {
            name: "Address",
            selector: (row) => row.address,
        },
        {
            name: "Payment Status",
            cell: (row) =>
                row.isPayment ? (
                    <span style={{ color: "green" }}>Paid</span>
                ) : (
                    <span style={{ color: "red" }}>Unpaid</span>
                ),
        },
        {
            name: "Actions",
            cell: (row) => <DeleteAction route={deleteUser + row._id} />
        },
    ];




    return (
        <div>
            <h2>User Management</h2>
            <DataTable
                columns={columns}
                data={userData}
                pagination
                highlightOnHover
                responsive
                subHeader
            />
        </div>
    );
}
