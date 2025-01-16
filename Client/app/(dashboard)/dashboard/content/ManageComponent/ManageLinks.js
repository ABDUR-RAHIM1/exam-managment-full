import React from 'react';
import DeleteAction from '@/app/helpers/Actions/admin/DeleteAction';
import { deleteHeadline, deleteLink } from '@/app/constans/constans';
import EditAction from '@/app/helpers/Actions/admin/EditAction';

export default function ManageLinks({ links }) {
    return (
        <div className="p-4">
            {
                links && links.length <= 0 ? (
                    <p className="text-red-800 font-bold text-left">Empty!</p>
                ) : (
                    links.map(item => (
                        <div
                            key={item._id}
                            className="flex items-center justify-between w-full mt-3 py-2 px-3 rounded-md bg-blue-200 shadow-md hover:shadow-lg transition-all duration-200"
                        >
                            <p className="text-left text-gray-800 font-medium">
                                {item.title}
                            </p>
                            <p className=" ml-3 text-left text-gray-800 font-medium">
                                {item.link}
                            </p>
                            <div className="flex items-center space-x-3">
                                <EditAction data={item} path={"/dashboard/content/quick-links"} />
                                <DeleteAction route={deleteLink + item._id} />
                            </div>
                        </div>
                    ))
                )
            }
        </div>
    );
}
