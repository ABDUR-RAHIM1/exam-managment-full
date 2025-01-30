"use client";
import { postDataHandler } from "@/app/actions/users/postData";
import { adminLogin, adminRole } from "@/app/constans/constans";
import { isValidPassword } from "@/app/helpers/Checker";
import Spinner from "@/app/helpers/Spinner";
import Cookies from "js-cookie";
import { useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";
import { BiShowAlt } from "react-icons/bi";
import { toast } from "react-toastify";
import VerifyAdmin from "./VerifyAdmin";

export default function AdminAuth() {

    const router = useRouter();
    const [loading, setLoading] = useState(false);
    const [passwordType, setPasswordType] = useState(false)
    const [verify, setVerify] = useState(false)
    const [formData, setFormData] = useState({
        email: "",
        role: "admin", // Default role
        password: "",
    });


    //  auto navigate to dashboard when Amin ALready Login
    useEffect(() => {
        const adminToken = Cookies.get("adminToken");

        if (adminToken) {
            toast.warning("You Have Already Login")
            router.push("/dashboard")
        }

    }, [])

    const handleShowPassword = () => {
        setPasswordType(!passwordType);
    }

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData((prevData) => ({
            ...prevData,
            [name]: value,
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        try {

            const isValidPass = isValidPassword(formData.password);


            if (!isValidPass) {
                setLoading(false);
                toast.error("Password must be at least 6 characters long!");
                return;
            }

            const { result, status } = await postDataHandler(formData, "POST", adminLogin);

            if (status === 200) {
                toast.success(result.message);
                Cookies.set("adminToken", result.token); // Use Cookies.set
                Cookies.set(adminRole, formData.role)
                router.refresh()
                router.push("/dashboard"); // Use router.push directly
            } else {
                toast.error(result.message);
            }
        } catch (error) {
            toast.error("Something went wrong!");
        } finally {
            setLoading(false);
        }
    };

    return (
        <>

            <div className={` ${verify ? "scale-0" :"scale-1"} transition-all duration-700 px-2 w-full min-h-screen fixed top-0 left-0 bg-gray-950 bg-opacity-90 flex items-center justify-center z-[50]`}>
                <VerifyAdmin setVerify={setVerify} />
            </div>

            <div className=" overflow-hidden px-2 md:px-0 py-16 flex flex-col lg:flex-row items-center justify-between md:h-screen bg-gray-100">
                {/* Left Section */}
                <div className="w-full h-auto md:h-screen md:w-[50%] bg-blue-600 flex items-center justify-center text-white">
                    <div className="text-center p-8">
                        <h1 className="text-4xl font-bold text-white">Admin Portal</h1>
                        <p className="mt-4 text-lg text-white">Welcome back! Please login to access your dashboard.</p>
                    </div>
                </div>


                {/* Right Section */}
                <div className="px-10 mr-0 md:mr-5 w-full md:w-[45%] bg-white shadow-md rounded-lg p-6">
                    <h2 className="text-2xl font-bold text-center mb-6 uppercase">Login</h2>
                    <form className="space-y-4" onSubmit={handleSubmit}>
                        <div>
                            <label htmlFor="email" className="block text-sm font-semibold mb-1">
                                Email
                            </label>
                            <input
                                type="email"
                                id="email"
                                name="email"
                                value={formData.email}
                                onChange={handleInputChange}
                                className="input w-full"
                                placeholder="Enter your email"
                                required
                            />
                        </div>
                        <div>
                            <label htmlFor="role" className="block text-sm font-semibold mb-1">
                                Role
                            </label>
                            <select
                                id="role"
                                name="role"
                                value={formData.role}
                                onChange={handleInputChange}
                                className="input w-full"
                                required
                            >
                                <option value="admin">Admin</option>
                                <option value="moderator">Moderator</option>
                            </select>
                        </div>
                        <div className="mb-4 relative">
                            <label className="block text-gray-700 font-medium mb-2">Password:</label>
                            <input
                                type={passwordType ? "text" : "password"}
                                name="password"
                                value={formData.password}
                                onChange={handleInputChange}
                                className="input"
                                required
                                placeholder="******"
                            />
                            <div onClick={handleShowPassword} className=" text-2xl absolute inset-y-0 top-8 right-0 flex items-center pr-3  cursor-pointer">
                                <BiShowAlt className={`${passwordType ? "text-blue-600" : "text-gray-500"}`} />
                            </div>
                        </div>
                        <button type="submit" className="loginBtn">
                            {loading ? <Spinner /> : "Login"}
                        </button>
                    </form>
                </div>
            </div>
        </>
    );
}
