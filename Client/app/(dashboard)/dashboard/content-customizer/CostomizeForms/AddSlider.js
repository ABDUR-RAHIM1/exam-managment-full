"use client"
import { postDataHandler } from '@/app/actions/users/postData';
import { postSliders } from '@/app/constans/constans';
import useFileUploader from '@/app/helpers/fileUploader';
import Spinner from '@/app/helpers/Spinner';
import React, { useEffect, useState } from 'react'
import { toast } from 'react-toastify';

export default function AddSlider() {
    const { uploader, uploadResponse, imgUrl } = useFileUploader();
    const [posting, setPosting] = useState(false);

    const [formData, setFormData] = useState({
        title: "",
        slider: ""
    });

    const handleChange = (e) => {
        const { type, name, value } = e.target;
        if (type === "file") {
            const file = e.target.files[0];
            uploader(file)
        }
        setFormData({ ...formData, [name]: value })
    };


    useEffect(() => {
        if (imgUrl) {
            setFormData({
                ...formData,
                slider: imgUrl
            })
        }
    }, [imgUrl])

    const { message, status } = uploadResponse
    const getStatusClass = (status) => {
        if (status === 102) return "text-yellow-500";
        if (status === 200) return "text-green-600";
        if (!status) return "text-black";
        return "text-red-500";
    };


    const handleSubmitSlider = async (e) => {
        e.preventDefault();
        setPosting(true)
        try {
            const { status, result } = await postDataHandler(formData, "POST", postSliders);

            if (status === 200 || status === 201) {
                toast.success(result.message)
            } else {
                toast.error(result.message)
            }
        } catch (error) {
            console.log(error)
            toast.error("Failed To Post Slider")
        } finally {
            setPosting(false)
        }
    }

    return (
        <div className=' w-full bg-gray-100 p-5'>
            <form onSubmit={handleSubmitSlider} className=' bg-white py-5 px-2 w-full md:w-[50%] m-auto'>

                <h2>Post Sliders Image</h2>

                <div className='my-3'>
                    <label htmlFor="slider">Title (optional)</label>
                    <input onChange={handleChange} type="text" name='title' className='input' />
                </div>
                <div className='my-3'>
                    <label htmlFor="slider" className={getStatusClass(status)}>
                        {message || "Uplaod Photo"}
                    </label>
                    <input onChange={handleChange} type="file" name='slider' className='input' />
                </div>

                <button disabled={status === 102} className='w-full my-3 py-2 bg-blue-600 text-white'>
                    {
                        posting ? <Spinner /> : "Post"
                    }
                </button>
            </form>
        </div>
    )
}
