"use client"
import Link from 'next/link';
import React from 'react';
import Image from 'next/image';
import ActionsBtn from './ActionBtn';
import ProfileSidebarMobile from './ProfileSidebarMobile';
import ProfileItems from './ProileItems';
import UserLogOutBtn from './UserLogOutBtn';
import { usePathname } from 'next/navigation';
import Cart from '@/app/components/Globals/Cart';

export default function ProfileSidebar({ profileInfo }) {

    const path = usePathname()

    const profilePhoto = profileInfo?.photo ? (
        <Image
            width={96}
            height={96}
            src={profileInfo.photo}
            alt={`tickmarq user Photo ${profileInfo?.name || 'User'}`}
            className="w-full h-full rounded-full"
        />
    ) : (
        <div className="w-24 h-24 flex items-center justify-center rounded-full bg-gray-600 text-white text-xl font-bold">
            {profileInfo?.name?.charAt(0).toUpperCase() || '?'}
        </div>
    );

    return (
        <>
            <div className="w-full hidden md:block overflow-y-auto py-10">

                {/* <=========== userInfo and edit Btn =============> */}
                <div className="my-5">
                    <div className="w-24 h-24 my-3 m-auto relative">
                        {profilePhoto}
                        <div className="absolute -bottom-2 -right-2">
                            <ActionsBtn userData={profileInfo} />
                        </div>
                    </div>

                    <h2 className="text-lg font-semibold text-gray-200 capitalize text-center">
                        {profileInfo?.name || 'Anonymous User'}
                    </h2>
                    <p className="text-sm text-gray-400 text-center">
                        {profileInfo?.emailPhone || 'No contact info available'}
                    </p>


                    <Link href={"/"} className=' text-center font-semibold inline-block mt-5 bg-blue-600 py-3 px-4 w-full text-white'>Go To Home</Link>

                    <div className="bg-gray-200 h-[2px] w-full my-4" />

                </div>
                {/* <=========== userInfo and edit Btn End =============> */}

                <div className="space-y-3">
                    {/* <=========== Course Cart  profile Under The Sidebar =============> */}
                    <Cart />
                    {/* <=========== Course Cart  profile Under The Sidebar end=============> */}

                    {ProfileItems &&
                        ProfileItems.map((item, index) => (
                            <Link
                                href={item.path}
                                key={index}
                                className={`w-full inline-block hover:bg-gray-700 px-4 py-2 rounded text-center md:text-left font-[500] capitalize text-yellow-50 ${path === item.path ? "bg-gray-500" : ""
                                    }`}
                            >
                                {item.item}
                            </Link>
                        ))}
                    {/* <=========== User LogOut btn Component =============> */}
                    <UserLogOutBtn />
                    {/* <=========== User LogOut btn Component End =============> */}
                </div>
            </div>

            {/* <=============Profie Nav Mobile view =============> */}
            <div className="block md:hidden">
                <ProfileSidebarMobile />
            </div>
            {/* <=============Profie Nav Mobile view End=============> */}
        </>
    );
}