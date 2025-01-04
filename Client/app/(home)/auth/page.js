"use client"
import { AuthPostHandler } from '@/app/actions/users/authPostHandler';
import { isValidEmailPhone, isValidPassword } from '@/app/helpers/Checker';
import { useToken } from '@/app/hooks/useToken';
import Cookies from 'js-cookie';
import { useRouter } from 'next/navigation';
import React, { useEffect, useState } from 'react';
import { toast } from 'react-toastify';

const RegistrationPage = () => {
    const [loading, setLoading] = useState(false);
    const [isClick, setIsClick] = useState(false); // Determines Login or Signup
    const router = useRouter();
    const token = useToken();

    useEffect(() => {
        if (token) {
            toast.info("You are already logged in!");
            setTimeout(() => {
                router.push("/profile");
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
        const apiEndpoint = isClick ? "/user/login" : "/user/register";

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
                router.push("/profile");
                setIsClick(!isClick);

            } else {
                toast.error(result.message); // Handle failure case
            }
        } catch (error) {
            toast.error("An unexpected error occurred!");
        } finally {
            setLoading(false);
        }
    };


    return (
        <div className="min-h-screen py-20 flex items-center justify-center bg-gradient-to-r from-blue-500 to-purple-600">
            <div className="w-full max-w-md p-8 space-y-6 bg-white rounded-lg shadow-lg">
                <h1 className="text-4xl font-extrabold text-center text-gray-800 mb-6">
                    {isClick ? "Login" : "Sign Up"}
                </h1>
                <form onSubmit={handleSubmit} className="space-y-6">
                    {!isClick && (
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
                        <label className="block text-gray-700 font-medium mb-2">Email/Phone:</label>
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
                    <div className="mb-4">
                        <label className="block text-gray-700 font-medium mb-2">Password:</label>
                        <input
                            type="password"
                            name="password"
                            value={formData.password}
                            onChange={handleChange}
                            className="input"
                            required
                            placeholder="******"
                        />
                    </div>
                    <button
                        type="submit"
                        className="loginBtn"
                        disabled={loading}
                    >
                        {loading ? "Loading..." : (isClick ? "Login" : "Signup")}
                    </button>
                </form>
                <p className="text-center text-gray-600 mt-4">
                    {isClick ? "Don't have an account?" : "Already have an account?"}
                    <span
                        onClick={() => setIsClick(!isClick)}
                        className=" mx-2 underline cursor-pointer transition-all hover:text-blue-600"
                    >
                        {isClick ? "Sign Up Here" : "Login Here"}
                    </span>
                </p>
            </div>
        </div>
    );
};

export default RegistrationPage;
