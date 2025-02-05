"use client"
import { postDataHandler } from '@/app/actions/admin/postData';
import { bookMethodsAll } from '@/app/constans/constans';
import { contextApi } from '@/app/contextApi/Context';
import useFileUploader from '@/app/helpers/fileUploader';
import Form_title_button from '@/app/helpers/Form_title_button';
import { useRouter } from 'next/navigation';
import React, { useContext, useEffect, useState } from 'react'
import { toast } from 'react-toastify';

export default function AddBook() {
    const router = useRouter();
    const [loading, setLoading] = useState(false)
    const { manageData } = useContext(contextApi)
    const { uploader, uploadResponse, imgUrl } = useFileUploader();
    const { status, message } = uploadResponse;
    const isEditable = manageData && Object.keys(manageData).length > 0
    const [formData, setFormData] = useState({
        coverPhoto: "",
        bookName: "",
        title: "",
        bookLink: ""
    });


    const handleChange = (e) => {
        const { type, name, value, files } = e.target;
        if (type === "file") {
            uploader(files[0])
        } else {
            setFormData({ ...formData, [name]: value })
        }

    };



    //  img Link set in FormData
    useEffect(() => {
        if (imgUrl) {
            setFormData({
                ...formData,
                coverPhoto: imgUrl
            })
        }
    }, [imgUrl]);

    //  editable Data set in FormData
    useEffect(() => {
        if (isEditable) {
            setFormData(manageData)
        }
    }, [manageData])

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true)
        try {

            let data;

            if (isEditable) {
                data = await postDataHandler(formData, "PUT", bookMethodsAll + manageData._id);
            } else {
                data = await postDataHandler(formData, "POST", bookMethodsAll);
            }


            const { status, result } = data

            if (status === 201 || status === 200) {
                toast.success(result.message);
                router.refresh()
            } else {
                toast.error(result.message)
            }

        } catch (error) {
            toast.error("Failed to Post Book")
        } finally {
            setLoading(false)
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
                <Form_title_button text={"Upload PDF Book"} />
                <form onSubmit={handleSubmit}>
                    <div className='my-4'>
                        <label htmlFor="coverPhoto" className={getStatusClass(status)}>
                            {message || "Cover Photo"}
                        </label>
                        <input
                            type="file"
                            name='coverPhoto'
                            id="coverPhoto"
                            className="input"
                            onChange={handleChange}
                            required={!isEditable}
                        />
                    </div>

                    <div className='my-4'>
                        <label htmlFor="bookName">Book Name</label>
                        <input
                            type="text"
                            name='bookName'
                            id="bookName"
                            className="input"
                            value={formData.bookName}
                            onChange={handleChange}
                            required
                        />
                    </div>

                    <div className='my-4'>
                        <label htmlFor="title">Title</label>
                        <input
                            type="text"
                            name='title'
                            id="title"
                            className="input"
                            value={formData.title}
                            onChange={handleChange}
                            required
                        />
                    </div>
                    <div className='my-4'>
                        <label htmlFor="bookLink">Book Link</label>
                        <input
                            type="text"
                            name='bookLink'
                            id="bookLink"
                            className="input"
                            value={formData.bookLink}
                            onChange={handleChange}
                            required
                        />
                    </div>

                    <button disabled={status === 102} className=' w-full p-2 bg-blue-600 text-white my-5 hover:bg-blue-700' type="submit">
                        {
                            loading ? "Please Wait" : isEditable ? "Update Book" : "Add Book"
                        }
                    </button>
                </form>
            </div>
        </div>
    )
}
