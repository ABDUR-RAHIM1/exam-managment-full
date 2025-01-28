
import DeleteAction from '@/app/helpers/Actions/admin/DeleteAction';
import Image from 'next/image';
import React from 'react'
import defaultLogo from "@/public/Images/logo.png"
import { deleteLogo } from '@/app/constans/constans';


export default async function ManageLogo({ logoData }) {
    const { _id, logo, createdAt } = logoData;
    return (
        <div className=' w-full my-10 bg-white p-4'>
            <div className=' w-full py-5 px-3 bg-gray-200 flex items-center justify-between flex-wrap'>
                <p>
                    {new Date(createdAt).toDateString()}
                </p>
                <DeleteAction route={deleteLogo + _id} />
            </div>
            <div className=' flex items-center justify-center my-5'>
                <Image
                    src={logo || defaultLogo}
                    width={200}
                    height={200}
                    alt='tickmarkq'
                    className=' w-[128px] h-[128px]'
                />
            </div>
        </div>
    )
}
