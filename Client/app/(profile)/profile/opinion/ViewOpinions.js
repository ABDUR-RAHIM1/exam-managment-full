import React from 'react';
import Actions from './OpinionActions/Actions';

export default function ViewOpinions({ opinionData }) {
    return (
        <div className=" p-0 md:p-6">
            {opinionData.length < 1 ? (
                <p className="text-center text-gray-500">কোনো মতামত নেই</p>
            ) : (
                <div className="flex items-center justify-between flex-wrap gap-6">
                    {opinionData.map((opinion) => (
                        <div key={opinion._id} className=" w-full md:w-[31%] rounded-lg overflow-hidden shadow-lg border">
                            <div className=" px-4 py-4">
                                <Actions id={opinion._id} opinion={opinion} />
                                <p className="text-gray-700 text-base mb-4">{opinion.opinion}</p>
                                <p className="text-gray-500 text-sm">Posted on: {new Date(opinion.createdAt).toLocaleDateString()}</p>
                            </div>
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
}
