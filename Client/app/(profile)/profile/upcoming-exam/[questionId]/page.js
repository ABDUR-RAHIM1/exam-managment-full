"use client"
import React, { useEffect, useState } from 'react'
import getSingleQuestion from '../GetSIngleQuestion';
import { toast } from 'react-toastify';
import { postDataHandler } from '@/app/actions/users/postData';

export default function ExamPage({ params }) {
    const { questionId } = params
    const [formData, setFormData] = useState(null);
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        const getData = async () => {
            const { status, result } = await getSingleQuestion(questionId);
            setFormData(result);
        }

        getData()
    }, [])

    const handleChange = (selectedAnsIndex, questionId) => {
        const selectedAns = selectedAnsIndex + 1;
        console.log(selectedAns , selectedAnsIndex)
        const updatedQuestions = formData.questions.map((q) =>
            q.questionId === questionId ? { ...q, selectedAns } : q
        );

        // Update formData with the new questions array
        setFormData({ ...formData, questions: updatedQuestions });
    }

    const handleQuestionSubmit = async () => {

        // Prepare the result data to send to the server
        setLoading(true)
        const result = formData.questions.map(q => ({
            questionId: q.questionId,
            questionText: q.questionText,
            options: q.options,
            selectedAns: q.selectedAns,
            correctAns: q.correctAns,
            clarification: q.clarification, /// afer delete decription
            isCorrect: Number(q.selectedAns) === Number(q.correctAns) //  akhane protita isCorrect compire kore true false store korce
        }));

        // Calculate right and wrong answers
        const rightAnswers = result.filter(item => item.isCorrect).length;
        const wrongAnswers = result.length - rightAnswers;
        const plusMark = 1 * rightAnswers
        const minusMark = 0.25 * wrongAnswers
        const totalMark = plusMark - minusMark;

        const resultData = {
            questionCategory: formData.questionCategory,
            questionTitle: formData.questionTitle,
            courseId: formData.courseId,
            questions: result,// Sending all question data with answers and correctness
            rightAnswers: rightAnswers, // Total correct answers
            wrongAnswers: wrongAnswers, // Total wrong answers
            totalMark: totalMark
        };

        try {
            const { status, result } = await postDataHandler(resultData, "POST", "/results/submit_question")

            if (status === 201) {
                toast.success(result.message)
            } else {
                toast.error(result.message)
            }
        } catch (error) { 
            toast.error('Error saving result');
        } finally {
            setLoading(false)
        }
    };


    if (formData === null) {
        return <p className="text-center mt-4">Loading questions...</p>;
    }


    return (
        <div className="p-6  min-h-screen flex items-center justify-center">
            <div className="bg-white shadow-lg rounded-lg p-8 max-w-4xl w-full">
                <h1 className="text-4xl font-bold text-gray-800 mb-8 text-center">
                    Question Paper
                </h1>
                <div className="border-b-2 pb-4 mb-8 text-gray-700">
                    <p className="mb-2">
                        <span className="font-semibold">Category:</span> {formData.questionCategory}
                    </p>
                    <p className="mb-2">
                        <span className="font-semibold">Course:</span> {formData.questionTitle}
                    </p>
                    <p className="mb-2">
                        <span className="font-semibold">Exam Date:</span>{" "}
                        {new Date(formData.examDate).toLocaleDateString("en-US")}
                    </p>
                    <p className="mb-2">
                        <span className="font-semibold">Exam Time:</span> {formData.examTime}
                    </p>
                    <p className="mb-2">
                        <span className="font-semibold">Duration:</span> {formData.examDuration} minute
                    </p>
                    <p className="mb-2">
                        <span className="font-semibold">Complated ?:</span> {formData.isComplete} minute
                    </p>
                </div>

                <div>
                    {formData !== null &&
                        formData.questions.map((item, index) => (
                            <div
                                key={index}
                                className="my-6 p-5 bg-gray-50 border-l-4 border-blue-500 rounded-md shadow-sm"
                            >
                                <h2 className="text-xl font-semibold text-gray-800 mb-4">
                                    <span className="text-blue-500">{index + 1}.</span> {item.questionText}
                                </h2>
                                <div className="space-y-2">
                                    {item.options.map((o, idx) => (
                                        <div key={idx} className="flex items-center">
                                            <input
                                                type="radio"
                                                name={item.questionId}
                                                value={o}
                                                id={`${item.questionId}-${idx}`}
                                                className="w-5 h-5 text-blue-600 focus:ring-blue-500 border-gray-300"
                                                onChange={(e) => handleChange(idx, item.questionId)}
                                            />
                                            <label
                                                htmlFor={`${item.questionId}-${idx}`}
                                                className="ml-3 text-gray-700"
                                            >
                                                {o}
                                            </label>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        ))}
                </div>

                <button
                    onClick={handleQuestionSubmit}
                    className="mt-6 bg-gradient-to-r from-blue-500 to-purple-500 text-white font-semibold py-3 px-6 rounded-lg shadow-md hover:shadow-lg transform hover:scale-105 transition duration-300 w-full"
                >
                    {loading ? "Loading . . . " : "Submit Answer"}
                </button>
            </div>
        </div>
    );
}
