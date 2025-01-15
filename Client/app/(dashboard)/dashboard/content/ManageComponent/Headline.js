import React from 'react';
import DeleteAction from '@/app/helpers/Actions/admin/DeleteAction';
import { deleteHeadline } from '@/app/constans/constans';
import EditAction from '@/app/helpers/Actions/admin/EditAction';

export default function Headline({ headline }) {
    return (
        <div className="p-4">
            {
                headline && headline.length <= 0 ? (
                    <p className="text-red-800 font-bold text-left">Empty!</p>
                ) : (
                    headline.map(item => (
                        <div
                            key={item._id}
                            className="flex items-center justify-between w-full mt-3 py-2 px-3 rounded-md bg-blue-200 shadow-md hover:shadow-lg transition-all duration-200"
                        >
                            <p className="text-left text-gray-800 font-medium">
                                {item.headline}
                            </p>
                            <div className="flex items-center space-x-3">
                                <EditAction data={item} path={"/dashboard/content/headline"} />
                                <DeleteAction route={deleteHeadline + item._id} />
                            </div>
                        </div>
                    ))
                )
            }
        </div>
    );
}
