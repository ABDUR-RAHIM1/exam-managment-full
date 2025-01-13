import { getDataHandler } from '@/app/actions/users/getData'
import userToken from '@/app/actions/users/getToken';
import NoDataFound from '@/app/components/Globals/NoDataFound';
import { freeQuestionGetAll } from '@/app/constans/constans'
import Link from 'next/link';
import React from 'react'

export default async function FreeExam() {
    const token = userToken();
    const { status, result } = await getDataHandler(freeQuestionGetAll);

    let demoFreeQuestion = Array.from({ length: 15 }, (_, index) => ({
        _id: `${index + 1}`,
        questionTitle: `BCS ${index + 1}`,
        questionCategory: `free ${index + 1}`,
        examDate: new Date().toLocaleDateString(),
        questions: Array.from({ length: Math.floor(Math.random() * 10) + 1 }, (_, i) => `Question ${i + 1}`),
        examTime: new Date().toLocaleTimeString(),
        examDuration: 5 + index + 1,
    }));


    if (token && status !== 200 || !result) {
        return <NoDataFound text={result?.message || "No Free Questions Available for You!"} />;
    }
    return (
        <div className='w-full min-h-screen p-5 md:p-10 bg-gray-200'>
            {/* Text Section */}
            <div className="bg-blue-100 text-center p-5 rounded-md mb-6 shadow-sm">
                <h1 className=" text-[17px] md:text-xl font-bold text-blue-700 ">আমাদের ফ্রি পরীক্ষাগুলি আজই দিন!</h1>
                <p className="text-gray-700 mt-2 text-sm md:text-[16px]">
                    ফ্রি পরীক্ষার মাধ্যমে আপনার প্রস্তুতি যাচাই করুন এবং আমাদের
                    <span className="font-bold text-blue-700 text-sm md:text-[16px]"> পেইড পরীক্ষা</span> প্রোগ্রামের মাধ্যমে আরও উন্নত শিক্ষার সুযোগ গ্রহণ করুন।
                    <Link href="/profile/course-list" className="text-blue-500 underline"> আমাদের পেইড সার্ভিস সম্পর্কে জানুন।</Link>
                </p>
            </div>

            <div className='flex items-center justify-between flex-wrap gap-3 md:gap-6'>
                {
                    !token ?
                        (
                            demoFreeQuestion?.map((question) => (
                                <QuestionCard key={question._id} question={question} />
                            ))
                        )
                        :
                        (result?.map((question) => (
                            <QuestionCard key={question._id} question={question} />
                        )))
                }
            </div>

        </div>
    )
}


function QuestionCard({ question }) {
    const token = userToken();
    return (
        <div className=" w-[48%] md:w-[23%] my-3 md:my-0 bg-white shadow-md rounded-lg p-6 flex flex-col justify-between">
            <h2 className="text-xl font-bold text-gray-800">{question.questionTitle}</h2>
            <p className="text-gray-600 mt-2">Category: {question.questionCategory}</p>
            <p className="text-sm text-gray-500 mt-2">
                Exam Date: {new Date(question.examDate).toLocaleDateString()}
            </p>
            <p className="text-sm text-gray-500">Questions: {question.questions?.length}</p>
            <p className="text-sm text-gray-500">Exam Time: {question.examTime}</p>
            <p className="text-sm text-gray-500">Duration: {question.examDuration}</p>
            <div className="mt-4 flex justify-between items-center">

                {
                    token ?
                        <Link
                            href={`/profile/upcoming-exam/${question._id}`}
                            className="text-sm text-blue-600  underline hover:no-underline"
                        >
                            পরীক্ষা দিন
                        </Link>
                        :
                        <Link
                            href={`/profile/upcoming-exam`}
                            className="text-sm text-blue-600  underline hover:no-underline"
                        >
                            পরীক্ষা দিন
                        </Link>
                }
            </div>
        </div>
    );
}