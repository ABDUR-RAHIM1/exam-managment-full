"use client"
import { AuthPostHandler } from '@/app/actions/users/authPostHandler';
import { isValidEmailPhone, isValidPassword } from '@/app/helpers/Checker';
import { useToken } from '@/app/hooks/useToken';
import Cookies from 'js-cookie';
import { useRouter } from 'next/navigation';
import React, { useEffect, useState } from 'react';
import { BiShowAlt } from "react-icons/bi";
import { toast } from 'react-toastify';
import ForgateForm from './ForgateForm';
import Spinner from '@/app/helpers/Spinner';
import Image from 'next/image';
import loginBg from "@/public/Images/loginBg.jpg"

const RegistrationPage = () => {
    const [loading, setLoading] = useState(false);
    const [isClick, setIsClick] = useState(false);
    const [openForgatForm, setOpenForgatForm] = useState(false)
    const router = useRouter();
    const token = useToken();
    const [passwordType, setPasswordType] = useState(false)

    useEffect(() => {
        if (token) {
            toast.info("আপনি ইতিমধ্যেই লগ ইন করেছেন");
            setTimeout(() => {
                router.push("/profile/upcoming-exam");
            }, 1000);
        }
    }, [token]);

    const [formData, setFormData] = useState({
        name: "",
        emailPhone: '',
        password: '',
    });

    const handleChange = (e) => {
        const { name, value } = e.target;

        setFormData({
            ...formData,
            [name]: value,
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        const apiEndpoint = !isClick ? "/user/login" : "/user/register";

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
            const { result, status } = await AuthPostHandler(formData, apiEndpoint);
            if (status === 200 || status === 201) {
                toast.success(result.message);
                // Cookies.set("userToken", result.token, { expires: 2 / 24 });
                if (!result.token) {
                    toast.error("Token not found!")
                }
                Cookies.set("userToken", result.token);
                router.refresh();
                router.push("/profile/upcoming-exam");
            } else {
                toast.error(result.message); // Handle failure case
            }
        } catch (error) {
            toast.error("An unexpected error occurred!");
        } finally {
            setLoading(false);
        }
    };

    // <<<<<<<<<<<<< Register / login form naviagate  >>>>>>>>>>>>>>>>>>>>
    const handleNaviagteForm = (btnText) => {
        if (btnText === "register") {
            setIsClick(true)
        } else {
            setIsClick(false)
        }
    }

    const handleShowPassword = () => {
        setPasswordType(!passwordType);
    }


    //  handleForgat Password 
    const handleForgotPassword = () => {
        setOpenForgatForm(true)
    }


    return (
        <div className="min-h-screen py-20 px-5 flex items-center justify-center bg-gray-200">
            <div className="w-full md:w-[90%] flex items-center justify-between flex-wrap p-8 space-y-6 bg-white rounded-lg shadow-lg">
                {/*  login Backgroud Wrapper */}
                <div className=' w-full md:w-[48%]'>
                    <Image
                        src={loginBg}
                        alt='Tickmarkq login page'
                        width={1000}
                        height={1000}
                        className='w-f h-full'
                    />
                </div>

                {/*  form Wrappper */}
                <div className=' w-full md:w-[50%]'>
                    <div className=' my-4 w-full rounded-full overflow-hidden '>
                        <button onClick={() => handleNaviagteForm("register")} className={`${isClick ? "bg-purple-600 " : "bg-purple-300 "} w-[50%] py-3 px-4 font-medium text-white uppercase`}>Register</button>
                        <button onClick={() => handleNaviagteForm("login")} className={` ${!isClick ? "bg-blue-600" : "bg-blue-300"} w-[50%] py-3 px-4 font-medium text-white uppercase`}>Login</button>
                    </div>
                    <form onSubmit={handleSubmit} className="space-y-6">
                        {isClick && (
                            <>
                                <div className="mb-4">
                                    <label className="block text-gray-700 font-medium mb-2">Name:</label>
                                    <input
                                        type="text"
                                        name="name"
                                        value={formData.name}
                                        onChange={handleChange}
                                        className="input"
                                        placeholder="Enter your Good name"
                                    />
                                </div>

                            </>
                        )}
                        <div className="mb-4">
                            <label className="block text-gray-700 font-medium mb-2">Email / Phone:</label>
                            <input
                                type="text"
                                name="emailPhone"
                                value={formData.emailPhone}
                                onChange={handleChange}
                                className="input"
                                required
                                placeholder="Enter your email or phone"
                            />
                        </div>
                        <div className="mb-4 relative">
                            <label className="block text-gray-700 font-medium mb-2">Password:</label>
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
                            className={` ${isClick ? "bg-purple-600" : "bg-blue-600"} py-2 px-5 text-center font-semibold my-3 rounded-md  w-full text-white`}
                            disabled={loading}
                        >
                            {loading ? <Spinner /> : (isClick ? "Register" : "Login")}
                        </button>

                        {
                            !isClick &&
                            <div className="my-3 text-center">
                                <p className="text-gray-600 text-sm">
                                    Forgot your password?
                                    <span
                                        className="text-blue-500 mx-2 font-semibold cursor-pointer hover:underline"
                                        onClick={handleForgotPassword}
                                    >
                                        Reset here
                                    </span>
                                </p>
                            </div>}


                    </form>
                </div>


            </div>

            {
                openForgatForm &&
                <ForgateForm
                    setState={setOpenForgatForm}
                />
            }
        </div>
    );
};

export default RegistrationPage;
