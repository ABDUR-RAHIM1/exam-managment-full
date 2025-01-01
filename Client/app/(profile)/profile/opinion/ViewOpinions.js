import React from 'react';
import Actions from './OpinionActions/Actions';

export default function ViewOpinions({ opinionData }) {
    return (
        <div className="container mx-auto p-6">
            {opinionData.length < 1 ? (
                <p className="text-center text-gray-500">কোনো মতামত নেই</p>
            ) : (
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
                    {opinionData.map((opinion) => (
                        <div key={opinion._id} className="max-w-sm rounded-lg overflow-hidden shadow-lg border">
                            <div className="px-4 py-4">
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
