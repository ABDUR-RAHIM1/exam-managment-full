"use client"
import { postDataHandler } from '@/app/actions/users/postData';
import { createHeadline, updateHeadline, updateSliders } from '@/app/constans/constans';
import { contextApi } from '@/app/contextApi/Context';
import Spinner from '@/app/helpers/Spinner';
import { useRouter } from 'next/navigation';
import React, { useContext, useEffect, useState } from 'react'
import { toast } from 'react-toastify';

export default function AddHeadline() {
    const router = useRouter();
    const { manageData, setManageData } = useContext(contextApi)
    const [posting, setPosting] = useState(false);
    const [formData, setFormData] = useState({
        headline: ""
    });

    const isEditable = manageData && Object.keys(manageData).length > 0


    const handleChange = (e) => {
        const { name, value } = e.target;

        setFormData({ ...formData, [name]: value })
    };



    //  setEditble Headline Info using Cookies
    useEffect(() => {
        if (isEditable) {
            setFormData(manageData)
        }
       
    }, [manageData])


    //  <=========== Submit Headline POST ============>
    const handleSubmitHeadline = async (e) => {
        e.preventDefault();
        setPosting(true)
        try {
            const { status, result } = await postDataHandler(formData, "POST", createHeadline);

            if (status === 200 || status === 201) {
                toast.success(result.message);
                router.refresh()
            } else {
                toast.error(result.message)
            }
        } catch (error) {
            console.log(error)
            toast.error("Failed To Post Headline")
        } finally {
            setPosting(false)
        }
    }


    //  <=========== Submit Headline UPDATE ============>
    const handleUpdateHeadline = async (e) => {
        e.preventDefault();
        setPosting(true)
        try {
            const { status, result } = await postDataHandler(formData, "PUT", updateHeadline + formData._id);

            if (status === 200 || status === 201) {
                toast.success(result.message);
                router.refresh()
            } else {
                toast.error(result.message)
            }
        } catch (error) {
            console.log(error)
            toast.error("Failed To Update Headline")
        } finally {
            setPosting(false)
        }
    }


    return (
        <div className=' w-full bg-gray-100 p-5'>
            <form onSubmit={
                isEditable ? handleUpdateHeadline : handleSubmitHeadline
            } className=' bg-white py-5 px-2 w-full md:w-[50%] m-auto'>

                <h2> {isEditable ? "Edit" : "Post"} Headline</h2>

                <div className='my-3'>
                    <label htmlFor="headline">Headline</label>
                    <input onChange={handleChange} type="text" value={formData.headline} name='headline' className='input' required />
                </div>


                <button className='w-full my-3 py-2 bg-blue-600 text-white'>
                    {
                        posting ? <Spinner /> : isEditable ? "Update" : "Post"
                    }
                </button>
            </form>
        </div>
    )
}
