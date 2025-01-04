import { getDataHandler } from '@/app/actions/users/getData';
import NoDataFound from '@/app/components/Globals/NoDataFound';
import { getPaymentHsitoryWithCourse } from '@/app/constans/constans';
import Image from 'next/image';
import React from 'react';

export default async function PaymentHistory() {
    const { status, result } = await getDataHandler(getPaymentHsitoryWithCourse);

    // If the request is unsuccessful or no result is found, show the NoDataFound component
    if (status !== 200 || !result) {
        return <NoDataFound />;
    }

    // Extract the single payment object (since we only expect one)
    const payment = result;

    return (
        <div className="my-10 p-0 md:p-6">
            <h1 className="text-2xl font-bold mb-4">Payment History</h1>
            <div className="border p-4 rounded-lg shadow-md">
                {/* Payment History Details */}
                <div className="flex justify-between mb-6">
                    <div>
                        <p className="text-lg font-semibold">Amount: ৳{payment.paymentHistory.amount}</p>
                        <p className="text-sm text-gray-600">Payment Method: {payment.paymentHistory.method}</p>
                        <p className="text-sm text-gray-600">Transaction ID: {payment.paymentHistory.transactionId}</p>
                        <p className="text-sm text-gray-600">Status: <span className={`font-semibold ${payment.paymentHistory.status === 'completed' ? 'text-green-600' : 'text-red-600'}`}>{payment.paymentHistory.status}</span></p>
                        <p className="text-sm text-gray-600">Date: {new Date(payment.paymentHistory.date).toLocaleString()}</p>
                    </div>
                    <div>
                        <p className="text-lg font-semibold">Course: {payment.courseId.title}</p>
                        <p className="text-sm text-gray-600">Category: {payment.courseId.category}</p>
                        <p className="text-sm text-gray-600">Regular Price: ৳{payment.courseId.regularPrice}</p>
                        <p className="text-sm text-gray-600">Offer Price: ৳{payment.courseId.offerPrice}</p>
                    </div>
                </div>

                {/* Course Notes */}
                <div className="mt-4">
                    <h3 className="font-semibold">Course Notes:</h3>
                    <ul className="list-disc pl-5">
                        {payment.courseId.note.map((note, index) => (
                            <li key={index} className="text-sm text-gray-600">{note}</li>
                        ))}
                    </ul>
                </div>

                {/* Course Books */}
                <div className="mt-4">
                    <h3 className="font-semibold">Books:</h3>
                    <ul className="list-disc pl-5">
                        {payment.courseId.books.map((book, index) => (
                            <li key={index} className="text-sm text-gray-600">{book}</li>
                        ))}
                    </ul>
                </div>

                {/* Course Schedule */}
                <div className="mt-4">
                    <h3 className="font-semibold">Schedule:</h3>
                    <Image width={1000}  height={1000} src={payment.courseId.schedule} alt="Course Schedule" className="rounded-md" />
                </div>
            </div>
        </div>
    );
}
