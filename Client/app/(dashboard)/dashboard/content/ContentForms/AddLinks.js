"use client"
import { postDataHandler } from '@/app/actions/users/postData';
import { createHeadline, createLink, updateHeadline, updateLink } from '@/app/constans/constans';
import { contextApi } from '@/app/contextApi/Context';
import Form_title_button from '@/app/helpers/Form_title_button';
import Spinner from '@/app/helpers/Spinner';
import { useRouter } from 'next/navigation';
import React, { useContext, useEffect, useState } from 'react'
import { toast } from 'react-toastify';

export default function AddLinks() {
    const router = useRouter();
    const { manageData } = useContext(contextApi)
    const [posting, setPosting] = useState(false);
    const [formData, setFormData] = useState({
        title: "",
        link: ""
    });

    const isEditable = manageData && Object.keys(manageData).length > 0


    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value })
    };



    //  setEditble Link Info  
    useEffect(() => {
        if (isEditable) {
            setFormData(manageData)
        }

    }, [manageData])


    //  <=========== Submit Link POST ============>
    const handleSubmitHeadline = async (e) => {
        e.preventDefault();
        setPosting(true)
        try {
            const { status, result } = await postDataHandler(formData, "POST", createLink);

            if (status === 200 || status === 201) {
                toast.success(result.message);
                router.refresh()
            } else {
                toast.error(result.message)
            }
        } catch (error) {
            console.log(error)
            toast.error("Failed To Post Link")
        } finally {
            setPosting(false)
        }
    }


    //  <=========== Submit Link UPDATE ============>
    const handleUpdateHeadline = async (e) => {
        e.preventDefault();
        setPosting(true)
        try {
            const { status, result } = await postDataHandler(formData, "PUT", updateLink + formData._id);

            if (status === 200 || status === 201) {
                toast.success(result.message);
                router.refresh()
            } else {
                toast.error(result.message)
            }
        } catch (error) { 
            toast.error("Failed To Update Link")
        } finally {
            setPosting(false)
        }
    }


    return (
        <div className=' w-full bg-gray-100 p-5'>
            <form onSubmit={
                isEditable ? handleUpdateHeadline : handleSubmitHeadline
            } className=' bg-white py-5 px-2 w-full md:w-[50%] m-auto'>
 
                  <Form_title_button text={"Link"} />

                <div className='my-3'>
                    <label htmlFor="title">Title</label>
                    <input onChange={handleChange} type="text" value={formData.title} name='title' className='input' required />
                </div>
                <div className='my-3'>
                    <label htmlFor="link">Link</label>
                    <input onChange={handleChange} type="text" value={formData.link} name='link' className='input' required />
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
