"use client"
import { deleteHandler } from '@/app/actions/users/deleteHandler'
import { deleteMyOpinion } from '@/app/constans/constans'
import { contextApi } from '@/app/contextApi/Context'
import { useRouter } from 'next/navigation'
import React, { useContext } from 'react'
import { MdDelete, MdEdit } from 'react-icons/md'
import { toast } from 'react-toastify'


// <========= Opinion Pages Actions ===========>
export default function Actions({ id, opinion }) {
    const { setManageData } = useContext(contextApi)
    const router = useRouter();


    //  <============ Edit Opinions handler ====================>
    const handleEditOpinoins = () => {
        setManageData(opinion);
        router.push("/profile/opinion")
    }


    //  <============ Delete Opinions ================>
    const handleDeleteOpinion = async (id) => {
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
            toast.error("Failed To Delete!")
        }
    }
    return (

        <div className=' flex items-center justify-between w-full py-2'>
            <MdEdit onClick={() => handleEditOpinoins()} className='text-2xl bg-blue-500 p-1 text-white cursor-pointer' />
            <MdDelete onClick={() => { handleDeleteOpinion(id) }} className='text-2xl bg-red-500 p-1 text-white cursor-pointer' />
        </div>
    )
}
