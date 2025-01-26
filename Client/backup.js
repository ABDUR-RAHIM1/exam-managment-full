import { getDataHandler } from "@/app/actions/users/getData";
import NoDataFound from "@/app/components/Globals/NoDataFound";
import { freeQuestionGetAll, purchaseCourseMe } from "@/app/constans/constans";
import { FormatedTime } from "@/app/helpers/FormatedTime";
import Image from "next/image";
import Link from "next/link";
import React from "react";


async function UpcomingExamPage() {

    const [myQuestion, freeQuestion] = await Promise.all([
        getDataHandler(purchaseCourseMe),
        getDataHandler(freeQuestionGetAll)
    ])

    const { status, result } = myQuestion
    const { course, questions } = result


    if (!myQuestion || !freeQuestion) {
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
                <div className=" mt-4  w-full h-auto">
                    <Image
                        width={1000}
                        height={1000}
                        src={course.schedule}
                        alt="Schedule"
                        className="rounded-lg w-auto h-auto m-auto shadow-md"
                    />
                </div>
            </div>

            {/* Questions List */}
            <div className="flex items-center justify-between flex-wrap gap-3 md:gap-6">
                {questions?.map((question) => (
                    <QuestionCard key={question._id} question={question} />
                ))}
            </div>



            <hr className=" my-5" />
            <div>
                <h3 className=" text-center my-3"> Free Questions</h3>
                <div className=" my-5 flex items-center justify-between flex-wrap gap-3 md:gap-6">
                    {
                        freeQuestion.status === 404 ?
                            <p>{freeQuestion.result?.message}</p>
                            :
                            freeQuestion.result?.map((question) => (
                                <QuestionCard key={question._id} question={question} />
                            ))
                    }
                </div>
            </div>
        </div>
    );
}


// <<<<<<<<<<<<<<<< Single Question Card - use in Front Of the page  >>>>>>>>>>>>>>>>>>>>>>>
function QuestionCard({ question }) {

    return (
        <div className="w-[48%] md:w-[22%] lg:w-[31%] my-3 md:my-0 bg-gray-100 shadow-md rounded-lg p-6 flex flex-col justify-between">
            <h2 className="text-xl font-bold text-gray-800">{question.questionTitle}</h2>
            <p className="text-gray-600 mt-2">Category: {question.questionCategory}</p>
            <p className="text-sm text-gray-500 mt-2">
                Exam Date: {new Date(question.examDate).toLocaleDateString()}
            </p>
            <p className="text-sm text-gray-500">Questions: {question.questions?.length}</p>
            <p className="text-sm text-gray-500">Exam Time: {FormatedTime(question.examTime)}</p>
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
