"use client";

import { deleteUser } from "@/app/constans/constans";
import { demoProfilePhoto } from "@/app/DemoData/DemoImg";
import DeleteAction from "@/app/helpers/Actions/admin/DeleteAction";
import Image from "next/image";
import React, { useContext, useEffect, useState } from "react";
import DataTable from "react-data-table-component";
import UserAccessModal from "./UserAccessModal";
import { contextApi } from "@/app/contextApi/Context";

export default function UserTable({ data }) {
    const { setAccessUserInfo } = useContext(contextApi)
    const [userData, setUserData] = useState([]);
    const [showModal, setShowModal] = useState(false)

    useEffect(() => {
        setUserData(data); // Set initial data
    }, [data]);

    const handleShowModal = (userInfo) => {
        setShowModal(!showModal);
        setAccessUserInfo(userInfo)
    }

    const handleCloseModal = () => {
        setShowModal(false)
    }


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
            selector: (row) => row.collage || "N/A",
        },
        {
            name: "Address",
            selector: (row) => row.address || "N/A",
        },
        {
            name: "Payment Status",
            cell: (row) =>
                row.paymentStatus ? (
                    <span className="px-2 py-1 rounded-sm bg-green-200 text-green-700">Paid</span>
                ) : (
                    <span className="px-2 py-1 rounded-sm bg-red-200 text-red-700">Unpaid</span>
                ),
        },
        {
            name: "Update Access",
            selector: row => <button onClick={() => handleShowModal(row)} className=" px-3 font-semibold py-1 rounded-md text-sm bg-blue-600 text-white">
                Edit
            </button>
        },
        {
            name: "Actions",
            cell: (row) => <DeleteAction route={deleteUser + row._id} />
        },
    ];




    return (
        <div>
            {showModal &&
                < UserAccessModal
                    handleCloseModal={handleCloseModal}
                />
            }
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
