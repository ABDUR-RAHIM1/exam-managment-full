"use client";
import Link from 'next/link';
import { useToken } from '@/app/hooks/useToken';
import React, { useEffect, useState } from 'react';
import { FaChevronDown } from 'react-icons/fa';
import ProfileItems from '../ProileItems';
import UserLogOutBtn from '@/app/(profile)/ProfileComponents/UserLogOutBtn';

export default function AccountBtn() {
    const token = useToken();
    const [isToken, setIsToken] = useState(false);
    const [showSubItems, setShowSubItems] = useState(false);

    useEffect(() => {
        if (token) {
            setIsToken(true)
        } else {
            setIsToken(false)
        }
    }, [token])

    return (
        <div className="relative inline-block">
            {isToken ? (
                <div
                    onMouseEnter={() => setShowSubItems(true)}
                    onMouseLeave={() => setShowSubItems(false)}
                    className="text-blue-500 bg-blue-200 px-4 py-2 rounded-sm font-bold cursor-pointer flex items-center space-x-2"
                >
                    <span>My Account</span>
                    <FaChevronDown className="text-sm" /> {/* Arrow icon */}
                    {/* Sub-items */}
                    {showSubItems && (
                        <div className="absolute -left-[65%] top-full bg-white border border-gray-200 shadow-md rounded-md w-48 z-10">
                            {ProfileItems.map((item, index) => (
                                <Link
                                    key={index}
                                    href={item.path}
                                    className="flex items-center px-4 py-2 text-gray-800 hover:bg-gray-100 space-x-2 text-sm"
                                >
                                    <span className=' text-2xl'>{item.icon}</span> {/* Icon */}
                                    <span>{item.item}</span> {/* Label */}
                                </Link>
                            ))}
                            <div className='px-3'>
                                <UserLogOutBtn setIsToken={setIsToken} />
                            </div>
                        </div>
                    )}
                </div>
            ) : (
                <Link href="/auth" className="text-blue-500 bg-blue-200 px-4 py-2 rounded-sm font-bold">
                    Login
                </Link>
            )}
        </div>
    );
}
