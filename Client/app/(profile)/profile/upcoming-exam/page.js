import { getDataHandler } from "@/app/actions/users/getData";
import NoDataFound from "@/app/components/Globals/NoDataFound";
import { purchaseCourseMe } from "@/app/constans/constans";
import Image from "next/image";
import Link from "next/link";
import React from "react";


async function UpcomingExamPage() {

    const { status, result } = await getDataHandler(purchaseCourseMe)

    const { course, questions } = result

    if (status !== 200 || !result) {
        return <NoDataFound />;
    }

    return (
        <div className="max-w-screen-xl mx-auto py-8 px-6">
            {/* Course Details Section */}
            <div className="bg-white shadow-md rounded-lg p-6 mb-8">
                <div className="w-full md:w-[50%] m-auto">
                    <h1 className="text-2xl font-bold text-gray-800">{course.title}</h1>
                    <p className="text-gray-600 mt-2">{course.desc}</p>
                    <div className="mt-4">
                        <span className="text-xl font-semibold text-gray-800">Price: </span>
                        <span className="text-lg text-red-600">BDT{course.offerPrice}</span>
                        <span className="text-sm line-through text-gray-500 ml-2">BDT{course.regularPrice}</span>
                    </div>
                    <div className="mt-4">
                        <span className="text-sm text-gray-500">Duration: {course.duration}</span>
                    </div>
                    <div className="mt-4">
                        <span className="text-sm text-gray-500">Books: {course?.books.join(", ")}</span>
                    </div>
                </div>
                <div className="mt-4 w-full h-auto">
                    <Image
                        width={1000}
                        height={1000}
                        src={course.schedule}
                        alt="Schedule"
                        className="rounded-lg w-auto h-auto shadow-md"
                    />
                </div>
            </div>

            {/* Questions List */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {questions?.map((question) => (
                    <QuestionCard key={question._id} question={question} />
                ))}
            </div>
        </div>
    );
}

// <<<<<<<<<<<<<<<< Single Question Card - use in Front Of the page  >>>>>>>>>>>>>>>>>>>>>>>
function QuestionCard({ question }) {

    return (
        <div className="bg-white shadow-md rounded-lg p-6 flex flex-col justify-between">
            <h2 className="text-xl font-bold text-gray-800">{question.questionTitle}</h2>
            <p className="text-gray-600 mt-2">Category: {question.questionCategory}</p>
            <p className="text-sm text-gray-500 mt-2">
                Exam Date: {new Date(question.examDate).toLocaleDateString()}
            </p>
            <p className="text-sm text-gray-500">Questions: {question.questions?.length}</p>
            <p className="text-sm text-gray-500">Exam Time: {question.examTime}</p>
            <p className="text-sm text-gray-500">Duration: {question.examDuration}</p>
            <div className="mt-4 flex justify-between items-center">

                <Link
                    href={`/profile/upcoming-exam/${question._id}`}
                    className="text-sm text-blue-600  underline hover:no-underline"
                >
                    পরীক্ষা দিন
                </Link>
            </div>
        </div>
    );
}

export default UpcomingExamPage;
