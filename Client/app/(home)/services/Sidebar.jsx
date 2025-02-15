import { getDataHandler } from '@/app/actions/users/getData';
import NoDataFound from '@/app/components/Globals/NoDataFound';
import { getResourse } from '@/app/constans/constans';
import React from 'react';

export default async function Sidebar() {
    const { status, result } = await getDataHandler(getResourse);

    if (!status || !result) {
        return <NoDataFound text={"Free Resourse not found"} />
    }

    return (
        <aside className="w-full md:w-[300px] py-10 px-4 bg-gray-100 rounded-lg shadow-md md:h-auto">
            <h2 className="text-xl font-bold mb-4 text-blue-600"> ফ্রি রিসোর্স </h2>
            <ul className="list-disc list-inside space-y-3">
                {
                    result && result.map(r => (
                        <li key={r._id}>
                            <a
                                href={r.link}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="text-blue-500 hover:underline"
                            >
                                {r.title}
                            </a>
                        </li>
                    ))
                }

            </ul>
        </aside>
    );
}
