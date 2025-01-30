"use client"
import { postDataHandler } from '@/app/actions/admin/postData';
import { adminVerify } from '@/app/constans/constans';
import React, { useState } from 'react'
import { toast } from 'react-toastify';

export default function VerifyAdmin({ setVerify }) {

    const [formData, setFormData] = useState({ varifyAdmin: "" });

    // Handle form submission
    const handleVarifyed = async (e) => {
        e.preventDefault();
        try {
            // Send form data to the backend
            const { status, result } = await postDataHandler(formData, "POST", adminVerify);
            if (status === 200 && result.token) {
                toast.success("Admin Verified");
                setVerify(true);
            } else {
                toast.error(result.message || "Verification failed");
            }
        } catch (error) {
            console.error(error?.message);
            toast.error("Verification Failed!");
        }
    };

    return (
        <form onSubmit={handleVarifyed} className='p-3 md:p-5 w-full md:w-[50%] m-auto bg-gray-200 rounded-md'>
            <input
                type="text"
                placeholder='Enter admin Secret Key'
                value={formData.varifyAdmin}
                onChange={(e) => setFormData({ ...formData, varifyAdmin: e.target.value })}
                className='input'
            />

            <button type='submit' className='w-full p-3 my-4 font-bold rounded-md bg-blue-600 text-white'>
                Verify Now
            </button>
        </form>
    )
}
