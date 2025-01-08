import { getDataHandler } from '@/app/actions/users/getData'
import NoDataFound from '@/app/components/Globals/NoDataFound';
import { freeQuestionGetAll } from '@/app/constans/constans'
import Link from 'next/link';
import React from 'react'

export default async function FreeExam() {
    const { status, result } = await getDataHandler(freeQuestionGetAll);
  
    if (status !== 200 || !result) {
        return <NoDataFound text={result?.message || "No Free Questions Available for You!"} />;
    }
    return (
        <div className='w-full min-h-screen p-5 md:p-10 bg-gray-200'>

            <div className='flex items-center justify-between flex-wrap gap-3 md:gap-6'>
                {result?.map((question) => (
                    <QuestionCard key={question._id} question={question} />
                ))}
            </div>

        </div>
    )
}


function QuestionCard({ question }) {

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