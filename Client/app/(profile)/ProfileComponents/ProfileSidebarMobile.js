"use client";
import Image from "next/image";
import React, { useState } from "react";
import ActionsBtn from "./ActionBtn";
import { demoProfilePhoto } from "@/app/DemoData/DemoImg";
import { MdClose, MdMenu } from "react-icons/md";
import ProfileItems from "./ProileItems";
import Link from "next/link";
import { usePathname } from "next/navigation";
import Cart from "@/app/components/Globals/Cart";

export default function ProfileSidebarMobile({ profileInfo }) {
    const [isOpen, setIsOpen] = useState(false);
    const path = usePathname();

    const handleOpenSidebar = () => {
        setIsOpen(!isOpen);
    };

    return (
        <div className="w-full py-5 px-5 bg-gray-800 flex items-center justify-between">
            {/* Profile Section */}
            <div className="flex gap-4 items-center z-[999]">
                <div className="w-16 h-16 my-3 m-auto relative">

                    {
                        profileInfo?.photo ? (
                            <Image
                                width={50}
                                height={50}
                                src={profileInfo?.photo || demoProfilePhoto}
                                alt={`tickmarq user Photo ${profileInfo?.name}`}
                                className="w-full h-full rounded-full mb-3 m-auto"
                            />
                        ) : (
                            <div className=" w-full h-full flex items-center justify-center bg-gray-600 text-xl font-bold text-white rounded-full">
                                {profileInfo?.name?.charAt(0).toUpperCase() || '?'}
                            </div>
                        )
                    }
                    <div className="absolute -bottom-2 -right-2">
                        <ActionsBtn userData={profileInfo} />
                    </div>
                </div>
                {/* Course Cart In Mobile View */}
                <div>
                    <Cart />
                </div>
                {/* Course Cart In Mobile View End */}
                <div className="flex flex-col items-start">
                    <h2 className="text-lg font-semibold text-gray-200 capitalize text-center">
                        {profileInfo?.name}
                    </h2>
                    <p className="text-sm text-gray-400 text-center">
                        {profileInfo?.emailPhone}
                    </p>
                </div>
            </div>

            {/* Menu Button */}
            <div onClick={handleOpenSidebar} className="relative z-[999]">
                {
                    isOpen ?
                        <MdClose className="text-4xl text-red-600 cursor-pointer transition-all" />
                        :
                        <MdMenu className="text-4xl text-white cursor-pointer transition-all" />
                }
            </div>

            {/* <==============  Mobile Nav(profile Sidebar) =================> */}
            <div
                className={`${isOpen ? "translate-x-0" : "translate-x-full"
                    } transition-transform transform w-[75%] flex flex-col items-center gap-4 z-50 bg-gray-800 text-white h-full fixed top-0 right-0`}
            >
                <div className="my-[150px] px-4">

                    <Link href={"/"} className=' text-center font-semibold inline-block mt-5 bg-blue-600 py-3 px-4 w-full text-white'>Go To Home</Link>
                    {ProfileItems &&
                        ProfileItems.map((item, index) => (
                            <Link
                                onClick={() => setIsOpen(false)}
                                href={item.path}
                                key={index}
                                className={`w-full inline-block hover:bg-gray-700 px-4 py-2 rounded text-center md:text-left font-[500] capitalize text-yellow-50 ${path === item.path ? "bg-gray-500" : ""
                                    }`}
                            >
                                {item.item}
                            </Link>
                        ))}
                </div>
            </div>
            {/* <==============  Mobile Nav(profile Sidebar) End =================>  */}
        </div>
    );
}
