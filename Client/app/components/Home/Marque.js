import { getDataHandler } from '@/app/actions/users/getData';
import { getHeadline } from '@/app/constans/constans';
import React from 'react';

export default async function Marque() {
    const { status, result } = await getDataHandler(getHeadline);

    if (status !== 200 || !result || result.length === 0) {
        return (
            <div className='w-full h-[65px] bg-blue-300 text-white flex items-center justify-center'>
                <p className='font-bold text-xl'>কোনও ঘোষণা পাওয়া যায়নি</p>
            </div>
        );
    }

    const headline = result[result?.length -1].headline;  

    return (
        <div className='w-full h-[65px] bg-blue-300 text-white flex items-center justify-between'>
            <div className='w-auto px-5 text-3xl font-bold bg-blue-600 h-full flex items-center justify-center'>
                ঘোষণা
            </div>
            <div className='flex-1 px-3'>
                <marquee width="100%" direction="left" height="100%">
                    <p className='font-bold text-2xl'>
                        {headline || "কোনও ঘোষণা পাওয়া যায়নি"}
                    </p>
                </marquee>
            </div>
        </div>
    );
}
