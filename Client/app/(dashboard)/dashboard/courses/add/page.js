"use client"
import { postDataHandler } from '@/app/actions/users/postData';
import { adminCreateCourse, adminUpdateCourse } from '@/app/constans/constans';
import { contextApi } from '@/app/contextApi/Context';
import useFileUploader from '@/app/helpers/fileUploader';
import React, { use, useContext, useEffect, useState } from 'react';
import { toast } from 'react-toastify';

export default function CourseAddPage() {
    const { manageData } = useContext(contextApi)
    const { uploader, uploadResponse, imgUrl } = useFileUploader();
    const [loading, setLaoding] = useState(false)
    const { status, message } = uploadResponse;

    const isUpdateData = manageData && Object.keys(manageData).length > 0
    const isRequired = isUpdateData ? false : true


    const [formData, setFormData] = useState({
        category: '',
        title: '',
        desc: '',
        books: '',
        duration: '',
        schedule: '',
        regularPrice: '',
        offerPrice: '',
        note: ''
    });
    console.log(formData)

    // handle change
    const handleChange = async (e) => {
        const { name, value, type, files } = e.target;
        if (type === "file") {
            await uploader(files[0])
            console.log("file")
        }
        setFormData({ ...formData, [name]: value });
    };


    // image url set in formData state
    useEffect(() => {
        if (imgUrl) {
            setFormData({ ...formData, schedule: imgUrl })
        }
    }, [imgUrl])


    // update data set the formData state after click edit button
    useEffect(() => {
        if (isUpdateData) {
            setFormData(manageData)
        }
    }, [manageData])


    /// <===================== create and update course ===================>
    const handleSubmit = async (e) => {
        e.preventDefault();
        setLaoding(true);
        try {
            // Convert books and note to arrays only if they are strings
            const booksArr = typeof formData.books === 'string' ? formData.books.split(",") : formData.books;
            const noteArr = typeof formData.note === 'string' ? formData.note.split(",") : formData.note;
    
            const data = {
                ...formData,
                books: booksArr,
                note: noteArr
            };
    
            let status, result; // Declare status and result here
    
            if (isUpdateData) {
                // Construct the URL for updating the course
                const editCourse = adminUpdateCourse + formData._id;
                // Perform the PUT request
                const response = await postDataHandler(data, "PUT", editCourse);
                status = response.status;  // Extract status
                result = response.result;  // Extract result
            } else {
                // Perform the POST request for creating a new course
                const response = await postDataHandler(data, "POST", adminCreateCourse);
                status = response.status;  // Extract status
                result = response.result;  // Extract result
            }
    
            // Handle the response based on the status
            if (status === 201 || status === 200) {
                toast.success(result.message);
            } else {
                toast.error(result.message);
            }
    
        } catch (error) {
            toast.error("Something went wrong!");
        } finally {
            setLaoding(false);
        }
    };
    

    const getStatusClass = (status) => {
        if (status === 102) return "text-yellow-500";
        if (status === 200) return "text-green-600";
        if (!status) return "text-black";
        return "text-red-500";
    };
    return (
        <div className="min-h-screen flex items-center justify-center">
            <div className="bg-gray-100 p-8 rounded shadow-md w-full max-w-2xl">
                <h1 className="text-2xl font-bold mb-6 text-gray-700">
                    {
                        isUpdateData ? "Edit The Course" : "Add New Course"
                    }
                </h1>
                <form onSubmit={handleSubmit}>
                    {/* Category */}
                    <div className="mb-4">
                        <label htmlFor="category" className="label">Category</label>
                        <input
                            id="category"
                            type="text"
                            name="category"
                            value={formData.category}
                            onChange={handleChange}
                            required={isRequired}
                            placeholder="Enter course category"
                            className="input"
                        />
                    </div>

                    {/* Title */}
                    <div className="mb-4">
                        <label htmlFor="title" className="label">Title</label>
                        <input
                            id="title"
                            type="text"
                            name="title"
                            value={formData.title}
                            onChange={handleChange}
                            required={isRequired}
                            placeholder="Enter course title"
                            className="input"
                        />
                    </div>

                    {/* Description */}
                    <div className="mb-4">
                        <label htmlFor="desc" className="label">Description</label>
                        <textarea
                            id="desc"
                            name="desc"
                            value={formData.desc}
                            onChange={handleChange}
                            required={isRequired}
                            rows={5}
                            placeholder="Enter course description"
                            className="input"
                        ></textarea>
                    </div>

                    {/* Books */}
                    <div className="mb-4">
                        <label htmlFor="books" className="label">Books</label>
                        <input
                            id="books"
                            type="text"
                            name="books"
                            value={formData.books}
                            onChange={handleChange}
                            required={isRequired}
                            placeholder="Enter books (comma separated)"
                            className="input"
                        />
                    </div>

                    {/* Duration */}
                    <div className="mb-4">
                        <label htmlFor="duration" className="label">Duration</label>
                        <input
                            id="duration"
                            type="text"
                            name="duration"
                            value={formData.duration}
                            onChange={handleChange}
                            required={isRequired}
                            placeholder="Enter duration (e.g., 3 months)"
                            className="input"
                        />
                    </div>

                    {/* Schedule */}
                    <div className="mb-4">
                        <label htmlFor="file" className={`${getStatusClass(status)} label`}>
                            {message || "Schedule (Routine Photo)"}
                        </label>
                        <input
                            id="file"
                            type="file"
                            required={isRequired}
                            onChange={handleChange}
                            className="input"
                        />
                    </div>

                    {/* Regular Price */}
                    <div className="mb-4">
                        <label htmlFor="regularPrice" className="label">Regular Price</label>
                        <input
                            id="regularPrice"
                            type="number"
                            name="regularPrice"
                            value={formData.regularPrice}
                            onChange={handleChange}
                            placeholder="Enter regular price"
                            required={isRequired}
                            className="input"
                        />
                    </div>

                    {/* Offer Price */}
                    <div className="mb-4">
                        <label htmlFor="offerPrice" className="label">Offer Price</label>
                        <input
                            id="offerPrice"
                            type="number"
                            name="offerPrice"
                            value={formData.offerPrice}
                            onChange={handleChange}
                            required={isRequired}
                            placeholder="Enter offer price"
                            className="input"
                        />
                    </div>

                    {/* Note */}
                    <div className="mb-4">
                        <label htmlFor="note" className="label">Note</label>
                        <input
                            id="note"
                            type="text"
                            name="note"
                            value={formData.note}
                            onChange={handleChange}
                            required={isRequired}
                            placeholder="Enter additional notes"
                            className="input"
                        />
                    </div>

                    {/* Submit Button */}
                    <button
                        type="submit"
                        className="formBtn"
                    >
                        {
                            loading ? "Posting ..." : isUpdateData ? "Update Course" : "Add Course"
                        }
                    </button>
                </form>
            </div>
        </div>

    );
}