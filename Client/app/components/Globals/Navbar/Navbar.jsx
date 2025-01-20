"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";
import React, { useEffect, useState } from "react";
import { FaChevronDown } from 'react-icons/fa';
import getCourseData from "./getCourseData";
import Logo from "../Logo";
import AccountBtn from "../AccountBtn";
import { MdClose, MdMenu } from "react-icons/md";

export default function MobileNavbar() {
    const [categories, setCategories] = useState(null)
    const path = usePathname();
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const [openDropdown, setOpenDropdown] = useState(null); // Track open dropdown

    useEffect(() => {
        const getData = async () => {
            const { status, result } = await getCourseData();
            if (status === 200 && result) {
                const uniqueCategories = [...new Set(result.map(r => r.category))];

                const dropdownItems = uniqueCategories.map(category => ({
                    item: category,
                    path: `/services/categorie/${category.toLowerCase()}`
                }));

                setCategories(dropdownItems);
            }
        };
        getData();
    }, []);

    const toggleDropdown = (dropdown) => {
        setOpenDropdown(openDropdown === dropdown ? null : dropdown);
    };

    const items = [
        { item: "Free Exam", path: "/free-exam" },
        { item: "Blogs", path: "/blogs" },
        { item: "Books", path: "/book-lists" },
    ];

    return (
        <div className="px-5 py-4 md:py-3 shadow-lg md:px-10 flex justify-between items-center bg-gray-100 sticky top-0 z-[9999] w-full">
            <Logo path={"/"} />

            {/* Mobile Menu Icon */}
            <div
                onClick={() => setIsMenuOpen(!isMenuOpen)}
                className="md:hidden z-50 text-4xl cursor-pointer">
                {
                    isMenuOpen ? <MdClose className="text-red-600" /> :
                        <MdMenu className="text-blue-700" />
                }
            </div>

            {/* Desktop Menu */}
            <nav className="HomeNav hidden md:flex items-center">
                {/* Services Dropdown */}
                <div className="relative group cursor-pointer">
                    <p className="hover:bg-blue-500 hover:text-white px-4 py-2 rounded-md duration-200 flex items-center gap-2">
                        <span>Services</span>
                        <FaChevronDown className="text-sm" /> {/* Arrow icon */}
                    </p>
                    <ul className="absolute top-10 left-0 hidden group-hover:flex flex-col space-y-2 bg-white p-4 shadow-md w-[150px] rounded-md border-2 border-dashed">
                        {categories && categories.length > 0 && categories.map((item, index) => (
                            <Link
                                key={index}
                                href={item.path}
                                className="block lowercase text-gray-700 text-[16px] hover:text-blue-500"
                            >
                                {item.item}
                            </Link>
                        ))}
                    </ul>
                </div>

                {/* Static Items */}
                {items.map((item, index) => (
                    <Link
                        key={index}
                        href={item.path}
                        className={`hover:text-blue-500 px-4 py-2 ${path.includes(item.path) ? "text-blue-500" : ""}`}
                    >
                        {item.item}
                    </Link>
                ))}

                {/* Profile Section */}
                <div>
                    <AccountBtn />
                </div>
            </nav>

            {/* Mobile Menu */}
            <div className={`flex md:hidden w-[75%] h-screen overflow-y-auto sidebar-scrollbar absolute top-[100%] right-0 z-50 bg-gray-100  items-center flex-col justify-start transition-all duration-300 ${isMenuOpen ? "block" : "hidden"}`}>
                {/* Mobile Menu Items */}
                <div className="flex flex-col py-5 w-[80%]">
                    {/* Services Dropdown */}
                    <div className="mb-4">
                        <p
                            className="text-lg text-blue-600 cursor-pointer hover:bg-blue-500 hover:text-white px-4 py-2 rounded-md duration-200 flex items-center gap-2"
                            onClick={() => toggleDropdown("services")}
                        >
                            <span>Services</span>
                            <FaChevronDown className="text-sm" /> {/* Arrow icon */}
                        </p>
                      
                        {openDropdown === "services" && (
                            <ul className=" w-full block mt-2 space-y-2 ml-3 bg-gray-200 p-2 rounded-md">
                                {categories && categories.length > 0 && categories.map((item, index) => (
                                    <Link
                                        key={index}
                                        href={item.path}
                                        className="block lowercase text-gray-700 text-[16px] hover:text-blue-500"
                                        onClick={() => setIsMenuOpen(false)}
                                    >
                                        {item.item}
                                    </Link>
                                ))}
                            </ul>
                        )}
                    </div>

                    {/* Static Items */}
                    {items.map((item, index) => (
                        <Link
                            key={index}
                            href={item.path}
                            className={`block text-lg text-gray-700 mb-4 ${path === item.path ? "text-red-500 font-bold" : ""}`}
                            onClick={() => setIsMenuOpen(false)}
                        >
                            {item.item}
                        </Link>
                    ))}

                    {/* Profile Section */}
                    <div className="mt-4" onClick={() => setIsMenuOpen(false)}>
                        <AccountBtn />
                    </div>
                </div>  
            </div>
        </div>
    );
}
