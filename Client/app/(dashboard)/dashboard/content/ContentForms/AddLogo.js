"use client"
import { postDataHandler } from '@/app/actions/admin/postData'
import { addLogo } from '@/app/constans/constans'
import useFileUploader from '@/app/helpers/fileUploader'
import Form_title_button from '@/app/helpers/Form_title_button'
import Spinner from '@/app/helpers/Spinner'
import { useRouter } from 'next/navigation'
import React, { useEffect, useState } from 'react'
import { toast } from 'react-toastify'

export default function AddLogo() {
    const router = useRouter()
    const { uploader, uploadResponse, imgUrl } = useFileUploader()
    const { status, message } = uploadResponse;
    const [posting, setPosting] = useState(false)
    const [formData, setFormData] = useState({ logo: "" })

    const handleChange = async (e) => {
        const file = e.target.files[0];
        uploader(file)
    };

    useEffect(() => {
        if (imgUrl) {
            setFormData({
                ...formData,
                logo: imgUrl
            })
        }
    }, [imgUrl]);

  
    const handleSubmit = async (e) => {
        e.preventDefault();
        setPosting(true)
        try {

            const { status, result } = await postDataHandler(formData, "POST", addLogo);

            if (status === 200 || status === 201) {
                toast.success(result.message);
                router.refresh()
            } else {
                toast.error(result.message)
            }

        } catch (error) { 
            toast.error("failed to Post Logo")
        } finally {
            setPosting(false)
        }
    }


    const getStatusClass = (status) => {
        if (status === 102) return "text-yellow-500";
        if (status === 200) return "text-green-600";
        if (!status) return "text-black";
        return "text-red-500";
    };

    return (
        <div className='w-full bg-gray-100 p-5'>
            <div className='bg-white py-5 px-2 w-full md:w-[50%] m-auto '>
                <Form_title_button text={"Logo"} />

                <form onSubmit={handleSubmit}>
                    <div>
                        <label htmlFor="notice" className={getStatusClass(status)}>
                            {message || "Logo"}
                        </label>
                        <input
                            type="file"
                            name='logo'
                            onChange={handleChange}
                            className='input'
                        />
                    </div>
                    <button
                        disabled={status === 102}
                        type="submit"
                        className="w-full bg-blue-500 text-white font-bold py-2 px-4 my-3 rounded hover:bg-blue-600"
                    >
                        {
                            posting ? <Spinner /> : " Add Logo"
                        }
                    </button>
                </form>
            </div>
        </div>
    )
}
