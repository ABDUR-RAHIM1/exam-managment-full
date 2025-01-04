"use client"
import { postDataHandler } from '@/app/actions/users/postData';
import { resetUserPass } from '@/app/constans/constans';
import { isValidEmailPhone, isValidPassword } from '@/app/helpers/Checker';
import React, { useState } from 'react';
import { BiShowAlt } from 'react-icons/bi';
import { MdClose } from 'react-icons/md';
import { toast } from 'react-toastify';

export default function ForgateForm({ setState }) {
    const [loading, setLoading] = useState(false)
    const [passwordType, setPasswordType] = useState(false)
    const [formData, setFormData] = useState({
        name: "",
        emailPhone: '',
        password: '',
    });

    const closeModal = () => {
        setState(false);
    };
    const handleShowPassword = () => {
        setPasswordType(!passwordType);
    }

    const handleChange = (e) => {
        const { name, value } = e.target;

        setFormData({
            ...formData,
            [name]: value,
        });
    };


    const handleResetPassword = async (e) => {
        e.preventDefault();
        setLoading(true);


        try {

            const isValid = isValidEmailPhone(formData.emailPhone);
            const isValidPass = isValidPassword(formData.password);

            if (!isValid) {
                setLoading(false);
                toast.error("Invalid email or phone number!");
                return;
            }
            if (!isValidPass) {
                setLoading(false);
                toast.error("Password must be at least 6 characters long!");
                return;
            }

            // Make API call using `AuthPostHandler`
            const { result, status } = await postDataHandler(formData, "POST", resetUserPass);
            if (status === 200 || status === 201) {
                toast.success(result.message);
            } else {
                toast.error(result.message);
            }
        } catch (error) {
            toast.error("An unexpected error occurred!");
        } finally {
            setLoading(false);
        }
    };



    return (

        <div
            className="fixed inset-0 z-50 flex items-center justify-center w-full h-screen bg-black bg-opacity-90"
            aria-hidden="true"
        >
            <div className="relative p-4 w-full max-w-md max-h-full bg-white rounded-lg shadow dark:bg-gray-700">
                {/* Modal Header */}
                <div className="flex items-center justify-between p-4 md:p-5 border-b rounded-t dark:border-gray-600">
                    <h3 className="text-xl font-semibold text-gray-900 dark:text-white">
                        Reset Your Password
                    </h3>
                    <button
                        type="button"
                        onClick={closeModal}
                        className="text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm w-8 h-8 ms-auto inline-flex justify-center items-center dark:hover:bg-gray-600 dark:hover:text-white"
                    >
                        <MdClose className=' text-3xl' />

                    </button>
                </div>

                {/* Modal Body */}
                <div className="p-4 md:p-5">
                    <form onSubmit={handleResetPassword} className="space-y-4">
                        <div>
                            <label
                                htmlFor="name"
                                className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                            >
                                Your Name
                            </label>
                            <input
                                type="text"
                                name="name"
                                id="name"
                                value={formData.name}
                                className="input"
                                placeholder="Your Old Name"
                                required
                                onChange={handleChange}
                            />
                        </div>
                        <div>
                            <label
                                htmlFor="email"
                                className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                            >
                                Your email Or Phone
                            </label>
                            <input
                                type="text"
                                name="emailPhone"
                                id="email"
                                className="input"
                                value={formData.emailPhone}
                                placeholder="Email Or Phone Numeber"
                                required
                                onChange={handleChange}
                            />
                        </div>
                        <div className="mb-4 relative">
                            <label className="block text-gray-700 font-medium mb-2">New Password:</label>
                            <input
                                type={passwordType ? "text" : "password"}
                                name="password"
                                value={formData.password}
                                onChange={handleChange}
                                className="input"
                                required
                                placeholder="******"
                            />
                            <div onClick={handleShowPassword} className=" text-2xl absolute inset-y-0 top-8 right-0 flex items-center pr-3  cursor-pointer">
                                 <BiShowAlt className={`${passwordType ? "text-blue-600" : "text-gray-500"}`} />
                            </div>
                        </div>

                        <button
                            type="submit"
                            className="w-full text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
                        >
                            {
                                loading ? "Loading . . . " : "Reset"
                            }
                        </button>

                    </form>
                </div>
            </div>
        </div>
    );
}
