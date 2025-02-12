import { getDataById } from '@/app/actions/globals/getDataById'
import NoDataFound from '@/app/components/Globals/NoDataFound'
import { getResultById } from '@/app/constans/constans'
import React from 'react'
import { FaCheck } from 'react-icons/fa'
import { MdClose } from 'react-icons/md'
import Logo from '@/app/components/Globals/Logo'

export default async function ResultsDetails({ params }) {
    const { questionId } = params
    const getDetailsApiEndpoint = `${getResultById + questionId}`
    const { status, result } = await getDataById(getDetailsApiEndpoint);


    if (status !== 200 || !result) {
        return <NoDataFound />
    }
    const minusMark = 0.25

    return (
        <div className='bg-gradient-to-r from-blue-50 to-indigo-100 min-h-screen p-6'>

            <div className="max-w-4xl mx-auto bg-white shadow-lg rounded-lg p-6">
                {result && (
                    <div>
                        <div className="border-b-2 pb-4 mb-6">
                            <div className="flex items-center justify-between flex-wrap">
                                <div className="flex items-center mb-4 md:mb-0">
                                    <Logo path={`/results/${questionId}`} />
                                </div>
                                <p className="text-sm font-medium text-gray-500 italic md:text-base">
                                    Empowering Knowledge, One Question at a Time
                                </p>
                            </div>

                            <h2 className="font-extrabold my-4 text-3xl sm:text-4xl md:text-5xl text-center text-indigo-700 tracking-wide drop-shadow-md">
                                Result Sheet
                            </h2>

                            <div className="bg-gradient-to-r my-5 from-blue-100 to-indigo-200 p-6 rounded-lg shadow-md flex items-center justify-between flex-wrap">
                                <div className='flex-1 mb-4 md:mb-0'>
                                    <h3 className="text-xl md:text-2xl font-bold text-gray-800 my-3">
                                        <span className="text-indigo-500">Category:</span> {result.questionCategory}
                                    </h3>
                                    <h4 className="text-lg md:text-xl font-semibold text-gray-700 my-2">
                                        <span className="text-indigo-500">Course:</span> {result.questionTitle}
                                    </h4>
                                    <h4 className="text-lg md:text-xl font-medium text-red-500 my-2">
                                        <span className="text-gray-600">Minus Mark:</span> {minusMark}
                                    </h4>
                                    <h4 className="text-lg md:text-xl font-medium text-green-600 my-2">
                                        <span className="text-gray-600">Total Mark:</span> {result.totalMark}
                                    </h4>

                                    <div className="text-lg md:text-xl font-medium my-4">
                                        {result.isPass ? (
                                            <span className='py-2 px-4 bg-green-500 text-white rounded-md'>Passed</span>
                                        ) : (
                                            <span className='py-2 px-4 bg-red-500 text-white rounded-md'>Failed</span>
                                        )}
                                    </div>
                                </div>

                                <div className='flex-1 flex flex-col gap-3'>
                                    <div className='flex items-center justify-start gap-3 w-full'>
                                        <p className="text-gray-700 font-medium min-w-[80px]">Correct:</p>
                                        <span className='w-[20px] h-[20px] inline-block rounded-full bg-green-500' />
                                    </div>
                                    <div className='flex items-center justify-start gap-3 w-full'>
                                        <p className="text-gray-700 font-medium min-w-[80px]">Wrong:</p>
                                        <span className='w-[20px] h-[20px] inline-block rounded-full bg-red-500' />
                                    </div>
                                    <div className='flex items-center justify-start gap-3 w-full'>
                                        <p className="text-gray-700 font-medium min-w-[80px]">Suggest:</p>
                                        <span className='w-[20px] h-[20px] inline-block rounded-full bg-blue-500' />
                                    </div>
                                </div>

                            </div>

                            <div className="flex justify-between bg-blue-100 p-4 rounded-md text-lg text-gray-700 font-medium mb-8 shadow">
                                <p><span className="font-bold text-blue-600">Submit:</span> {result.rightAnswers + result.wrongAnswers}</p>
                                <p><span className="font-bold text-green-600">Right:</span> {result.rightAnswers}</p>
                                <p><span className="font-bold text-red-600">Wrong:</span> {result.wrongAnswers}</p>
                                <p><span className="font-bold text-black">Skip:</span> {result.skip || 0}</p>
                            </div>

                            <div>
                                {result.questions.map((question, i) => (
                                    <Details key={i} question={question} index={i} />
                                ))}
                            </div>
                        </div>
                    </div>
                )}
            </div>
        </div>

    )
}



const Details = (props) => {
    const { questionText, options, selectedAns, correctAns, isCorrect, clarification } = props.question
    const { index } = props;

    return (
        <div className="bg-gray-50 p-4 rounded-md mb-6 shadow">
            <h2 className="text-xl font-semibold text-gray-800 mb-4">
                <span>{index + 1 + " ."}</span>    {questionText}
            </h2>
            <ul className="space-y-4">
                {options.map((option, optionIndex) => (
                    <li
                        key={optionIndex}
                        className='flex items-center'
                    >
                        <span className="mr-2 font-bold">{String.fromCharCode(97 + optionIndex)}.</span>
                        <span className={`px-3 py-2 rounded-md text-sm font-medium border ${selectedAns - 1 === optionIndex
                            ? isCorrect
                                ? "bg-gree-100 text-green-700  border-green-300"
                                : "bg-red-100 text-red-700 border-red-300"
                            : optionIndex === correctAns - 1
                                ? "bg-blue-100 text-blue-700"
                                : ""
                            }`}>
                            {option}
                        </span>
                        {optionIndex === selectedAns - 1 && (
                            <span className="ml-2 text-lg">
                                {selectedAns - 1 === correctAns - 1 ? (
                                    <FaCheck className="text-green-500" />
                                ) : (
                                    <MdClose className="text-red-500" />
                                )}
                            </span>
                        )}
                    </li>


                ))}
            </ul>
            <div className="bg-green-100 mt-4 p-3 rounded text-sm">
                {clarification?.split("\n").map((line, index) => (
                    <p key={index} className="text-green-600 my-3 whitespace-pre-line">{line}</p>
                ))}
            </div>
        </div>
    )
}


