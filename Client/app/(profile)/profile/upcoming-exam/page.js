import { getDataHandler } from "@/app/actions/users/getData";
import { freeQuestionGetAll, purchaseCourseMe } from "@/app/constans/constans";
import { FormatedTime } from "@/app/helpers/FormatedTime";
import Image from "next/image";
import Link from "next/link";
import React from "react";
import Questions from "./Questions/Questions";
import QuestionTable from "./Questions/QuestionTable";


async function UpcomingExamPage() {

    const [myCourse, freeQuestion] = await Promise.all([
        getDataHandler(purchaseCourseMe),
        getDataHandler(freeQuestionGetAll)
    ]);

    const { status, result } = myCourse;


    return (
        <div className=" w-full min-h-screen bg-white">
            {/*    Paid and free questions Table (parents) start here */}

            <div>
                {
                    status === 200 &&
                    <Questions
                        courseId={result?._id}
                    />

                }
            </div>

            <hr className=" my-5" />
            <div className="mx-2">
                <h3 className=" text-center my-3"> ফ্রি পরীক্ষা সমূহ  </h3>
                <div className=" my-5">
                    {
                        freeQuestion.status !== 200 ?
                            <p>{freeQuestion.result?.message}</p>
                            :
                            <QuestionTable
                                questions={freeQuestion.result}
                                title={"ফ্রি তে পরীক্ষা দিন"}
                            />
                    }
                </div>
            </div>


            {
                status !== 200 ?
                    <p className="p-4 text-red-500 font-bold text-xl">
                        {
                            result.message || "আপনি কোন কোর্স কিনেননি!"
                        }
                    </p>
                    :
                    <div className="bg-white shadow-md rounded-lg p-2 md:p-6 mb-8">
                        <div className="bg-white shadow-lg rounded-lg p-6 mb-8 w-full md:w-[80%] lg:w-[60%] mx-auto border border-gray-200">
                            {/* Course Title */}
                            <h1 className="text-3xl font-extrabold text-gray-900 text-center">{result.title}</h1>
                            <h2 className="text-xl font-semibold text-gray-700 text-center mt-2">{result.category}</h2>

                            {/* Course Description */}
                            <p className="text-gray-600 mt-4 text-justify">{result.desc}</p>

                            {/* Price Section */}
                            <div className="mt-6 flex justify-center items-center space-x-3">
                                <span className="text-2xl font-semibold text-gray-800">Price:</span>
                                <span className="text-xl text-red-600 font-bold">BDT {result.offerPrice}</span>
                                <span className="text-lg line-through text-gray-500">BDT {result.regularPrice}</span>
                            </div>

                            {/* Duration */}
                            <div className="mt-4 text-center">
                                <span className="text-lg font-medium text-gray-700 bg-gray-200 px-4 py-2 rounded-full">⏳ কোর্সটি চলবে: {result.duration}</span>
                            </div>

                            {/* Books List */}
                            <div className="mt-6 bg-gray-100 p-2 md:p-4 rounded-lg shadow">
                                <h3 className="text-lg font-bold text-red-700 mb-2">📚 যে বইগুলো থেকে পরীক্ষা নেওয়া হবে:</h3>
                                <p className="text-sm text-gray-700 whitespace-pre-line">
                                    {result?.books?.map((book, index) => (
                                        <span key={index} className="block px-3 py-1 bg-white shadow-sm rounded-md my-1">
                                            📖 {book}
                                        </span>
                                    ))}
                                </p>
                            </div>
                        </div>



                        <div className="mt-4 w-full  border border-gray-300 rounded-lg shadow-md">
                            <Image
                                width={1000}
                                height={1000}
                                src={result.schedule}
                                className="w-auto h-auto:"
                                title="Schedule PDF"
                            ></Image>
                        </div>



                    </div>


            };


            {/*    Paid and free questions End here */}

        </div>
    )

};


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