"use client"
import { postDataHandler } from '@/app/actions/users/postData';
import { createNotice, updateNotice } from '@/app/constans/constans';
import { contextApi } from '@/app/contextApi/Context';
import useFileUploader from '@/app/helpers/fileUploader';
import Spinner from '@/app/helpers/Spinner';
import { useRouter } from 'next/navigation';
import React, { useContext, useEffect, useState } from 'react';
import { toast } from 'react-toastify';

export default function AddNotice() {
    const { manageData } = useContext(contextApi)
    const router = useRouter();
    const [posting, setPosting] = useState(false)
    const { uploader, uploadResponse, imgUrl } = useFileUploader();
    const { status, message } = uploadResponse;

    const isEditable = manageData && Object.keys(manageData).length > 0

    const [formData, setFormData] = useState({
        title: '',
        notice: null,
    });

    const handleChange = (e) => {
        const { type, name, value, files } = e.target;
        if (type === "file") {
            uploader(files[0])
        } else {
            setFormData((prev) => ({
                ...prev,
                [name]: value,
            }));
        }

    };

    useEffect(() => {
        if (imgUrl) {
            setFormData({
                ...formData,
                notice: imgUrl
            })
        }
    }, [imgUrl])


    useEffect(() => {
        if (isEditable) {
            setFormData(manageData)
        }
    }, [manageData])

    const handleSubmit = async (e) => {
        e.preventDefault();
        setPosting(true)
        try {

            const { status, result } = await postDataHandler(formData, "POST", createNotice);

            if (status === 200 || status === 201) {
                toast.success(result.message);
                router.refresh()
            } else {
                toast.error(result.message);
            }

        } catch (error) {
            toast.error("Failed To Post!");
            console.log(error)
        } finally {
            setPosting(false)
        }

    };

    const handleUpdate = async (e) => {
        e.preventDefault();
        setPosting(true)
        try {

            const { status, result } = await postDataHandler(formData, "PUT", updateNotice + formData._id);

            if (status === 200 || status === 201) {
                toast.success(result.message);
                router.refresh()
            } else {
                toast.error(result.message);
            }

        } catch (error) {
            toast.error("Failed To Post!");
            console.log(error)
        } finally {
            setPosting(false)
        }

    };



    const getStatusClass = (status) => {
        if (status === 102) return "text-yellow-500";
        if (status === 200) return "text-green-600";
        if (!status) return "text-black";
        return "text-red-500";
    };

    return (
        <div className="w-full bg-gray-100 p-5">
            <div className="bg-white py-5 px-2 w-full md:w-[50%] m-auto ">
                <h1 className="text-2xl font-bold text-center mb-6"> {isEditable ? "Edit" : "Add"} Notice</h1>
                <form onSubmit={isEditable ? handleUpdate : handleSubmit}>
                    {/* Title */}
                    <div className="mb-4">
                        <label htmlFor="title" className="block text-sm font-medium text-gray-700">
                            Title
                        </label>
                        <input
                            type="text"
                            id="title"
                            name="title"
                            className="input w-full border border-gray-300 rounded-md p-2 mt-1"
                            placeholder="Enter notice title"
                            value={formData.title}
                            onChange={handleChange}
                            required
                        />
                    </div>
                    {/* Notice Photo */}
                    <div className="mb-4">

                        <label htmlFor="notice" className={getStatusClass(status)}>
                            {message || "Notice Photo"}
                        </label>
                        <input
                            type="file"
                            id="notice"
                            name="notice"
                            className="input w-full border border-gray-300 rounded-md p-2 mt-1"
                            onChange={handleChange}
                            accept="image/*"
                            required={!isEditable}
                        />
                    </div>
                    {/* Submit Button */}
                    <button
                        disabled={status === 102}
                        type="submit"
                        className="w-full bg-blue-500 text-white font-bold py-2 px-4 rounded hover:bg-blue-600"
                    >
                        {
                            posting ? <Spinner /> : isEditable ? "Update" : " Add Notice"
                        }
                    </button>
                </form>
            </div>
        </div>
    );
}
