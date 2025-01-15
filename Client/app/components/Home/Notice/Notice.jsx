import { getDataHandler } from '@/app/actions/users/getData';
import { getNotice } from '@/app/constans/constans';
import Heading from '@/app/helpers/Heading'
import Link from 'next/link';
import React from 'react'
import NoDataFound from '../../Globals/NoDataFound';
import { GoDownload } from "react-icons/go";

export default async function Notice() {
    const { status, result } = await getDataHandler(getNotice);

    if (status !== 200 || !result) {
        return <NoDataFound />
    }

    // Function to format date and time
    const formatDate = (dateString) => {
        const date = new Date(dateString);
        return `${date.toLocaleDateString()} ${date.toLocaleTimeString()}`;
    }

    return (
        <div className='px-5 md:px-10 border-b border-gray-300'>
            <div className='flex items-center justify-between flex-wrap'>
                <div className="w-full md:w-[70%] max-h-[500px] overflow-y-auto overflow-x-auto sidebar-scrollbar py-10 border-gray-400 pr-0 md:pr-4">
                    <Heading text={"নোটিশ বোর্ড"} />

                    <table className="min-w-[450px] md:min-w-full bg-pink-50 border border-gray-300">
                        <thead>
                            <tr className="bg-gray-100 border-b">
                                <th className="text-left py-2 px-4">Index</th>
                                <th className="text-left py-2 px-4">Title</th>
                                <th className="text-left py-2 px-4">Published</th>
                                <th className="text-left py-2 px-4">View</th>
                            </tr>
                        </thead>
                        <tbody >
                            {result.map((notice, index) => (
                                <tr key={notice._id} className="border-b hover:bg-gray-50">
                                    <td className="py-2 px-4">{index + 1}</td>
                                    <td className="py-2 px-4">{notice.title}</td>
                                    <td className="py-2 px-4">{formatDate(notice.createdAt)}</td>
                                    <td className="py-2 px-4">
                                        <Link href={`/`}>
                                            <GoDownload className='text-2xl text-blue-500' />

                                        </Link>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>

                {/*  right side */}
                <div className='w-full md:w-[28%] py-10 my-5 md:my-0 p-4 border-0 md:border-l border-gray-400'>
                    <div className='my-5'>
                        <h2 className='text-lg font-bold mb-4'>Quick Links</h2>
                        <ul className='list-disc list-inside mb-6'>
                            <li><Link href="https://www.10minuteschool.com" target="_blank" rel="noopener noreferrer">10 Minute School</Link></li>
                            <li><Link href="https://www.shikhbe.shobai" target="_blank" rel="noopener noreferrer">Shikhbe Shobai</Link></li>
                            <li><Link href="https://www.bdjobstraining.com" target="_blank" rel="noopener noreferrer">Bdjobs Training</Link></li>
                            <li><Link href="https://www.skill.jobs" target="_blank" rel="noopener noreferrer">Skill Jobs</Link></li>
                            <li><Link href="https://www.sheiboi.com" target="_blank" rel="noopener noreferrer">Shei Boi</Link></li>
                        </ul>
                    </div>

                    {/* Google Ad Placeholder */}
                    <div className="google-ad w-full h-40 bg-gray-200 flex items-center justify-center rounded-lg">
                        <span className="text-gray-600">Google Ad Placeholder</span>
                    </div>
                </div>

            </div>

        </div>
    )
}
