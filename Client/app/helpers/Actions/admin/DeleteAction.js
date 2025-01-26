"use client"
import DeleteBtn from '@/app/helpers/DeleteBtn'
import React, { useState } from 'react'
import { toast } from 'react-toastify';
import { useRouter } from 'next/navigation';
import Spinner from '../../Spinner';
import { deleteHandler } from '@/app/actions/admin/deleteHandler';

export default function DeleteAction({ route }) {
    const router = useRouter()
    const [deleting, setDeleting] = useState(false);

    const handleDelete = async () => {
        const deleteRoute = route;
        try {
            setDeleting(true)
            const { status, result } = await deleteHandler(deleteRoute);
            if (status === 200) {
                toast.success(result.message || "Deleted Succesfuly");
                router.refresh();
            } else {
                toast.error(result.message || "Deleted Failed");
            }

        } catch (error) {
            toast.error("Failed To Delete!")
        } finally {
            setDeleting(false)
        }
    }
    return (
        <button onClick={handleDelete}>
            {
                deleting ? <Spinner /> : <DeleteBtn />
            }
        </button>
    )
}
