import { getDataHandler } from '@/app/actions/users/getData';
import { getNotice } from '@/app/constans/constans';
import Heading from '@/app/helpers/Heading'
import React from 'react'
import NoDataFound from '../../Globals/NoDataFound';
import QuicLink from './QuicLink';
import NoticeAction from './NoticeAction';

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
        <div className='px-2 md:px-10 mt-10 border-b border-gray-300'>
            <Heading text={"নোটিশ বোর্ড"} />
            <div className='flex justify-between flex-wrap'>

                <div className="w-full md:w-[70%] max-h-[500px] overflow-y-auto overflow-x-auto sidebar-scrollbar py-10 border-gray-400 pr-0 md:pr-4">
                    <table className="min-w-[450px] md:min-w-full bg-pink-50 border border-gray-300">
                        <thead>
                            <tr className="bg-gray-100 border-b">
                                <th className="text-left py-2 px-4">Title</th>
                                <th className="text-left py-2 px-4">Published</th>
                                <th className="text-left py-2 px-4">View</th>
                            </tr>
                        </thead>
                        <tbody >
                            {result.map((notice) => (
                                <tr key={notice._id} className="border-b hover:bg-gray-50">
                                    <td className="py-2 px-4">{notice.title}</td>
                                    <td className="py-2 px-4">{formatDate(notice.createdAt)}</td>
                                    <td className="py-2 px-4">
                                        <NoticeAction notice={notice.notice} />
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                  
                </div>


                {/*  right side */}
                <div className=' hidden md:block w-full md:w-[28%] max-h-[500px] overflow-y-auto sidebar-scrollbar my-5 md:my-0 p-4 border-0 md:border-l border-gray-400'>
                    <QuicLink />
                </div>
            </div>

        </div>
    )
}
