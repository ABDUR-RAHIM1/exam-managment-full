"use client"
import React, { useEffect, useState } from 'react';
import DeleteAction from '@/app/helpers/Actions/admin/DeleteAction';
import { deleteLink, deleteResourse } from '@/app/constans/constans';
import EditAction from '@/app/helpers/Actions/admin/EditAction';
import DataTable from 'react-data-table-component';

export default function ManageLinks({ links, page }) {
    const [linksData, setLinksData] = useState([]);
    const title = page === "freeResourse" ? "Free resourses" : "Quick links"
    const editPath = page === "freeResourse" ? "/dashboard/content/free-resourse" : "/dashboard/content/quick-links";

    const deleteApi = page === "freeResourse" ? deleteResourse : deleteLink


    useEffect(() => {
        if (links) {
            setLinksData(links)
        }
    }, [links])


    const columns = [
        {
            name: "#",
            selector: (row, index) => index + 1
        },
        {
            name: "link Title",
            selector: (row) => row.title
        },
        {
            name: "links",
            selector: (row) => row.link
        },
        {
            name: "Edit",
            selector: (row) => <EditAction data={row} path={editPath} />
        },
        {
            name: "Delete",
            selector: (row) => <DeleteAction route={deleteApi + row._id} />
        },
    ]


    return (
        <div className="p-4">

            <DataTable
                title={title}
                columns={columns}
                data={linksData}
                pagination
            />

        </div>
    );
}
