import Image from 'next/image';
import React from 'react'

export default function BookCard({ bookInfo }) {
    const { coverPhoto, bookName, title, bookLink } = bookInfo;
    return (
        <div
            className="bg-white shadow-xl rounded-lg overflow-hidden transform transition duration-300 hover:scale-[1.02]"
        >
            <div className="w-full h-[280px] overflow-hidden">
                <Image
                    src={coverPhoto}
                    width={500}
                    height={280}
                    alt={title}
                    className="w-full h-full  hover:scale-105 transition duration-300"
                />
            </div>
            <div className="p-5">
                <h2 className="text-xl font-semibold text-gray-800">{bookName}</h2>
                <p className="text-gray-600 mt-1">
                    ✍️ <span className="font-medium">{title}</span>
                </p>
                <a
                    href={bookLink}
                    className="mt-4 block bg-blue-500 text-white text-center py-2 rounded-lg font-medium hover:bg-blue-600 transition duration-300"
                    target="_blank"
                    rel="noopener noreferrer"
                >
                    📖 Read PDF
                </a>
            </div>
        </div>
    )
}
