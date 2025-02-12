"use client";
import Link from 'next/link';
import { useSearchParams } from 'next/navigation';
import React from 'react';

export default function Bkash() {
    const params = useSearchParams();

    const status = params.get("status");
    const paymentId = params.get("paymentId");

    return (
        <div className="w-full min-h-screen flex items-center justify-center bg-gray-50 p-5 md:p-10">
            <div className="w-full max-w-lg bg-white rounded-lg shadow-lg p-8">
                {
                    status === "success" ?
                        <div className="text-center space-y-5">
                            <h2 className="text-2xl font-semibold text-green-600">Congratulations!</h2>
                            <p className="text-lg text-gray-600">Your payment was successful.</p>
                            <div className="text-sm text-gray-500">
                                <p>Payment ID: <span className="font-medium text-blue-500">{paymentId}</span></p>
                            </div>
                            <div className=' flex items-center justify-center'>
                                <Link
                                    href={"/profile/upcoming-exam"}
                                    className=' inline-block py-3 px-4 rounded-md border-4 border-s-black  font-bold'
                                >
                                    আপনার প্রোফাইলে যান
                                </Link>
                            </div>
                        </div>
                        :
                        <div className="text-center space-y-5">
                            <h2 className="text-2xl font-semibold text-red-600">Payment Failed!</h2>
                            <p className="text-lg text-gray-600">Unfortunately, your payment did not go through.</p>
                            <p className="text-sm text-gray-500">Please try again later or contact support for assistance.</p>
                        </div>
                }
            </div>
        </div>
    );
}
