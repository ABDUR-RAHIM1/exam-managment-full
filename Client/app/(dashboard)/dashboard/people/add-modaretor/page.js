"use client";
import { postDataHandler } from "@/app/actions/users/postData";
import { adminRegister } from "@/app/constans/constans";
import useFileUploader from "@/app/helpers/fileUploader";
import React, { useEffect, useState } from "react";
import { toast } from "react-toastify";

const AddModeratorPage = () => {
    const { uploader, uploadResponse, imgUrl } = useFileUploader();
    const [loading, setLoading] = useState(false)
    // State for form data
    const [formData, setFormData] = useState({
        username: "",
        email: "",
        photo: null,
        password: "",
        role: "moderator",
    });
 
    // Handle input changes
    const handleChange = async (e) => {
        const { name, value, type, files } = e.target;
        if (type === "file") {
            await uploader(files[0]);
        } else {
            setFormData((prevData) => ({ ...prevData, [name]: value }));
        }
    };

    // <======== image url set in the formData State after uploaded Image =======>
    useEffect(() => {
        if (imgUrl) {
            setFormData({
                ...formData,
                photo: imgUrl
            })
        }
    }, [imgUrl])


    // Handle form submission
    const handleSubmit = async (e) => {
        e.preventDefault();
        try {

            setLoading(true)

            const { status, result } = await postDataHandler(formData, "POST", adminRegister);

            if (status === 201 || status === 200) {
                toast.success(result.message)
            } else {
                toast.error(result.message)
            }

        } catch (error) { 
            toast.error("Failed To Create New")
        } finally {
            setLoading(false)
        }
    };


    const { message, status } = uploadResponse // from fileUplaoder.js

    const getStatusClass = (status) => {
        if (status === 102) return "text-yellow-500";
        if (status === 200) return "text-green-600";
        if (!status) return "text-black";
        return "text-red-500";
    };

    return (
        <div className="flex items-center justify-center min-h-screen bg-gray-100">
            <div className="w-full max-w-lg p-8 bg-white shadow-md rounded-lg">
                <h2 className="text-2xl font-bold text-center text-gray-800">Add User / Modaretor</h2>
                <form className="mt-6" onSubmit={handleSubmit}>
                    {/* Username */}
                    <div className="mb-4">
                        <label htmlFor="username" className="block text-sm font-medium text-gray-700">
                            Username
                        </label>
                        <input
                            type="text"
                            name="username"
                            value={formData.username}
                            onChange={handleChange}
                            className="input"
                            placeholder="Enter username"
                        />
                    </div>
                    {/* Email */}
                    <div className="mb-4">
                        <label htmlFor="email" className="block text-sm font-medium text-gray-700">
                            Email
                        </label>
                        <input
                            type="email"
                            name="email"
                            value={formData.email}
                            onChange={handleChange}
                            className="input"
                            placeholder="Enter email"
                        />
                    </div>

                    {/* Password */}
                    <div className="mb-4">
                        <label htmlFor="password" className="block text-sm font-medium text-gray-700">
                            Password
                        </label>
                        <input
                            type="password"
                            name="password"
                            value={formData.password}
                            onChange={handleChange}
                            className="input"
                            placeholder="Enter password"
                        />
                    </div>
                    {/* Role */}
                    <div className="mb-4">
                        <label htmlFor="role" className="block text-sm font-medium text-gray-700">
                            Role
                        </label>
                        <select
                            name="role"
                            value={formData.role}
                            onChange={handleChange}
                            className="input"
                        >
                            <option value="">Select role</option>
                            <option value="admin">Admin</option>
                            <option value="moderator">Moderator</option>
                        </select>
                    </div>

                    {/* Photo */}
                    <div className="mb-4">
                        {/* <label htmlFor="photo" className="block text-sm font-medium text-gray-700">
                            Photo
                        </label> */}
                        <label htmlFor="photo" className={`${getStatusClass(status)} label`}>
                            {message || "Uplaod Photo"}
                        </label>
                        <input
                            type="file"
                            name="photo"
                            onChange={handleChange}
                            className="input"
                        />
                    </div>

                    {/* Submit Button */}
                    <button
                        type="submit"
                        className="w-full py-2 px-4 text-white bg-blue-600 rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
                    >
                        {
                            loading ? "Waiting . . ." : "  Add New"
                        }
                    </button>

                </form>
            </div>
        </div>
    );
};

export default AddModeratorPage;
