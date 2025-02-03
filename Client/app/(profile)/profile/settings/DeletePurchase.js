"use client"
import { deleteHandler } from '@/app/actions/users/deleteHandler'
import { purchaseDelete } from '@/app/constans/constans'
import Spinner from '@/app/helpers/Spinner'
import { useRouter } from 'next/navigation'
import React, { useState } from 'react'
import { toast } from 'react-toastify'

export default function DeletePurchase() {

    const [deleteLoading, setDeleteLoading] = useState(false)
    const router = useRouter();

    const hanldeDeletePurchase = async () => {
        setDeleteLoading(true)
        try {

            const isConfirm = confirm("আপনি কি ডিলিট করতে চান ?");
 
            if (!isConfirm) {
                return 
            }

            const { status, result } = await deleteHandler(purchaseDelete);

            if (status === 200 || status === 201) {
                toast.success(result.message);
                router.refresh();
            } else {
                toast.error(result.message)
            }

        } catch (error) {
            toast.error("Failed to Delete!")
        } finally {
            setDeleteLoading(false)
        }

    }


    return (
        <div className="max-w-lg mx-auto mt-10 p-6 bg-red-50 border border-red-200 rounded-2xl shadow-md">
            <h2 className="text-lg font-semibold text-red-600">⚠️ সতর্কতা!</h2>
            <p className="mt-2 text-gray-700">
                আপনি যদি আপনার কেনা কোর্স মুছে ফেলেন, তাহলে এটি পুনরুদ্ধার করা সম্ভব হবে না।
                নিশ্চিত না হয়ে ডিলিট করবেন না।
            </p>
            <button onClick={hanldeDeletePurchase} className="mt-4 w-full px-4 py-2 bg-red-600 text-white font-semibold rounded-lg hover:bg-red-700 transition-all duration-300">
                {
                    deleteLoading ? <Spinner /> : " 🚨 কোর্স ডিলিট করুন"
                }
            </button>
        </div>
    )
}
