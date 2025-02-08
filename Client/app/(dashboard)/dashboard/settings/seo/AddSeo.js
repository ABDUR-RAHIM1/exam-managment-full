"use client"
import { postDataHandler } from '@/app/actions/admin/postData';
import { seoPostUpdate } from '@/app/constans/constans';
import useFileUploader from '@/app/helpers/fileUploader';
import { getFileStatusClass } from '@/app/helpers/GetFileStatusStyle';
import Spinner from '@/app/helpers/Spinner';
import { useRouter } from 'next/navigation';
import React, { useEffect, useState } from 'react'
import { toast } from 'react-toastify';

export default function AddSeo() {
    const router = useRouter();
    const [loading, setLoading] = useState(false)
    const { uploader, uploadResponse, imgUrl } = useFileUploader();
    const { message, status } = uploadResponse // from fileUplaoder.js
    const [formData, setFormData] = useState({
        title: "",
        description: "",
        keywords: "",
        icons: "", //  image link
    });


    const handleChange = (e) => {
        const { name, value, type, files } = e.target;

        if (type === "file") {
            uploader(files[0])
        } else {
            setFormData((prev) => ({
                ...prev,
                [name]: value
            }))
        }
    };

    useEffect(() => {
        if (imgUrl) {
            setFormData((prev) => ({
                ...prev,
                icons: imgUrl
            }))
        }
    }, [imgUrl])



    const handleSubmitSeo = async (e) => {
        e.preventDefault();
        setLoading(true)
        try {

            const formattedKeywords = formData.keywords
                .split(",")
                .map((item) => item.trim());


            const newFormData = {
                ...formData,
                keywords: formattedKeywords
            };
            const { status, result } = await postDataHandler(newFormData, "POST", seoPostUpdate);

            if (status === 200 || status === 201) {
                toast.success(result.message);
                router.refresh();
            } else {
                toast.error(result.message)
            }

        } catch (error) {
            toast.error("Failed to Post")
        } finally {
            setLoading(false)
        }
    }

    return (
        <div className=' w-full md:w-[70%] m-auto'>

            <form onSubmit={handleSubmitSeo} className=' bg-white p-5'>
                <div className='my-3'>
                    <label htmlFor="title">Seo Title</label>
                    <input type="text" onChange={handleChange} name='title' value={formData.title} placeholder='Seo TItle' className='input' required />
                </div>

                <div className='my-3'>
                    <label htmlFor="keywords">Keywords</label>
                    <textarea rows={5} type="text" onChange={handleChange} name='keywords' value={formData.keywords} placeholder='Seo keywords' className='input' required />
                </div>

                <div className='my-3'>
                    <label htmlFor="description">Description</label>
                    <textarea rows={5} onChange={handleChange} name='description' value={formData.description} placeholder='Seo Description' className='input' required />
                </div>

                <div className='my-3'>
                    <label htmlFor="" className={getFileStatusClass(status)}>
                        {message || "Upload faviocn"}
                    </label>
                    <input type="file" onChange={handleChange} name='icon' className='input' />
                </div>

                <button type='submit' className=' my-4 p-3 bg-blue-600 text-white rounded-md font-bold hover:bg-blue-800 transition-all w-full'>
                    {
                        loading ? <Spinner /> : "Add Seo"
                    }
                </button>

            </form>

        </div>
    )
}
