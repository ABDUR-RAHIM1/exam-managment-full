import { getDataHandler } from "@/app/actions/users/getData";
import NoDataFound from "@/app/components/Globals/NoDataFound";
import { purchaseCourseMe } from "@/app/constans/constans";
import Image from "next/image";
import Link from "next/link";
import React from "react";

async function UpcomingExamPage() {

    const { status, result } = await getDataHandler(purchaseCourseMe)

    if (status !== 200 || !result) {
        return <NoDataFound />
    }

    return (
        <div className="max-w-screen-xl mx-auto py-8 px-6">
            {/* Course Details Section */}
            <div className="bg-white shadow-md rounded-lg p-6 mb-8">
                <div className=" w-full md:w-[50%] m-auto">
                    <h1 className="text-2xl font-bold text-gray-800">{result.title}</h1>
                    <p className="text-gray-600 mt-2">{result.desc}</p>
                    <div className="mt-4">
                        <span className="text-xl font-semibold text-gray-800">Price: </span>
                        <span className="text-lg text-red-600">BDT{result.offerPrice}</span>
                        <span className="text-sm line-through text-gray-500 ml-2">BDT{result.regularPrice}</span>
                    </div>
                    <div className="mt-4">
                        <span className="text-sm text-gray-500">Duration: {result.duration}</span>
                    </div>
                    <div className="mt-4">
                        <span className="text-sm text-gray-500">Books: {result?.books.join(", ")}</span>

                    </div>
                </div>
                <div className="mt-4 w-full h-auto">
                    <Image
                        width={1000}
                        height={1000}
                        src={result.schedule}
                        alt="Schedule"
                        className="rounded-lg w-auto h-auto shadow-md"
                    />
                </div>
            </div>

            {/* Questions List */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {result.questions.map((question) => (
                    <div
                        key={question._id}
                        className="bg-white shadow-md rounded-lg p-6 flex flex-col justify-between"
                    >
                        <h2 className="text-xl font-bold text-gray-800">{question.questionTitle}</h2>
                        <p className="text-gray-600 mt-2">Category: {question.questionCategory}</p>
                        <p className="text-sm text-gray-500 mt-2">
                            Exam Date: {new Date(question.examDate).toLocaleDateString()}
                        </p>
                        <p className="text-sm text-gray-500">Exam Time: {question.examTime}</p>
                        <p className="text-sm text-gray-500">Duration: {question.examDuration}</p>
                        <div className="mt-4 flex justify-between items-center">
                            <Link href={`/profile/upcoming-exam/${question._id}`} className="text-sm text-blue-600 hover:underline">Question Paper</Link>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}

export default UpcomingExamPage;
