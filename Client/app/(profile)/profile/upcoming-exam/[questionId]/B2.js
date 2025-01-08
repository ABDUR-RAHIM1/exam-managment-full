"use client";
import React, { useContext, useEffect, useState } from "react";
import getSingleQuestion from "../GetSIngleQuestion";
import { toast } from "react-toastify";
import { postDataHandler } from "@/app/actions/users/postData";
import { useRouter } from "next/navigation";
import Loading from "@/app/components/Globals/Loading";
import { contextApi } from "@/app/contextApi/Context";
import Spinner from "@/app/helpers/Spinner";

export default function ExamPage({ params }) {
    const { setExamTimeMatch } = useContext(contextApi)
    const router = useRouter();
    const { questionId } = params;
    const [result, setResult] = useState(null)
    const [formData, setFormData] = useState(null);
    const [loading, setLoading] = useState(false);
    const [totalQuesCount, setTotalQuesCount] = useState(0);
    const [selectQuesCount, setSelectQuesCount] = useState(0);
    const [examDuration, setExamDuration] = useState(0)
    const [remainingTime, setRemainingTime] = useState(0)
    const [isExamEnd, setIsExamEnd] = useState(false);

    // check exam date match , past , future
    const [dateStatus, setDateStatus] = useState("");
    const [timeStatus, setTimeStatus] = useState("")
    const [examAtATime, setExamAtATime] = useState(true);

    //  auto submit question paper after Remaining Time
    useEffect(() => {
        if (remainingTime <= 0 && isExamEnd || examDuration === 0) {
            handleQuestionSubmit();
            setTimeout(() => {
                setDateStatus("past");
                setExamTimeMatch("");
            }, 500);
        }
    }, [remainingTime, examDuration, isExamEnd]);

    //  only fetch Data from databsae
    useEffect(() => {
        const getData = async () => {
            const { status, result } = await getSingleQuestion(questionId);
            setFormData(result);
            setResult(result)
            setTotalQuesCount(result.questions.length);
        }
        getData()
    }, [questionId])



    // date and time conditionaly get / set
    useEffect(() => {

        if (!result) return;

        const examDate = new Date(result.examDate).toLocaleDateString()
        const [examHour, examMinute] = result.examTime.split(":").map(Number)
        const examDuration = result.examDuration;
        const convertExamDuratinnToSeconds = Number(examDuration) * 60;

        setExamDuration(convertExamDuratinnToSeconds)

        const examStartTime = examHour * 3600 + examMinute * 60; // convert in seconds
        const examEndTime = examStartTime + convertExamDuratinnToSeconds

        // date and time now Start
        const date = new Date();
        const newDate = date.toLocaleDateString();
        const currentHour = date.getHours();
        const currentMinutes = date.getMinutes();
        const currentSeconds = date.getSeconds();

        const currentTime = currentHour * 3600 + currentMinutes * 60 + currentSeconds;
        // date and time now End

        // <========= Exam Sesh hote koto shomoy baki ace seta count korbe ===========>
        const remianTime = examEndTime - currentTime;
        setRemainingTime(remianTime)

        // <======= Exam Sesh hote koto shomoy baki ace seta count korbe (end) ===========>

        // < ======== compare Start ==========>
        let isAtAtime = false
        if (newDate > examDate) {
            setDateStatus("past")
            isAtAtime = false
        } else if (newDate > examDate) {
            setDateStatus("past")
            isAtAtime = false
        } else {
            setDateStatus("match")
            /// checing the time match or not
            if (currentTime < examStartTime) {
                setTimeStatus("future")
                isAtAtime = false
            } else if (currentTime > examEndTime) {
                setTimeStatus("past")
                isAtAtime = false;

            } else if (currentTime === examEndTime) {
                setIsExamEnd(true)
            }
            else {
                setTimeStatus("match")
                setExamTimeMatch("match")
                isAtAtime = true
            }
        }
        setExamAtATime(isAtAtime)


        // <========= compare End ============>

    }, [result, remainingTime]);

    // time counDown for Remaing  Time
    useEffect(() => {
        // Set a timer for countdown

        let timer;

        if (timeStatus === "past") {

            timer = setInterval(() => {

                setExamDuration((prevTime) => {
                    if (prevTime <= 0) {
                        clearInterval(timer);
                        return 0;
                    }
                    return prevTime - 1;
                });
            }, 1000)
        } else {
            timer = setInterval(() => {

                setRemainingTime((prevTime) => {
                    if (prevTime <= 0) {
                        clearInterval(timer);
                        return 0;
                    }
                    return prevTime - 1;
                });
            }, 1000)
        }


        return () => clearInterval(timer);
    }, [timeStatus]);


    const handleChange = (selectedAnsIndex, questionId) => {
        const selectedAns = selectedAnsIndex + 1;
        const updatedQuestions = formData.questions.map((q) =>
            q.questionId === questionId ? { ...q, selectedAns } : q
        );

        // Use updatedQuestions to count selected answers
        const selectedQuestions = updatedQuestions.filter((q) => q.selectedAns !== "");

        // Update formData with the new questions array
        setFormData({ ...formData, questions: updatedQuestions });

        // Update total questions count
        setTotalQuesCount(updatedQuestions.length);
        setSelectQuesCount(selectedQuestions.length);
    };

    const handleQuestionSubmit = async () => {

        // Prepare the result data to send to the server

        if (!formData) {
            return
        }

        setLoading(true);
        const result = formData.questions.map((q) => ({
            questionId: q.questionId,
            questionText: q.questionText,
            options: q.options,
            selectedAns: q.selectedAns,
            correctAns: q.correctAns,
            clarification: q.clarification,
            isCorrect: Number(q.selectedAns) === Number(q.correctAns), // Check correctness
        }));

        // Calculate right and wrong answers
        const rightAnswers = result.filter((item) => item.isCorrect).length;
        const wrongAnswers = result.length - rightAnswers;
        const plusMark = 1 * rightAnswers;
        const minusMark = 0.25 * wrongAnswers;
        const totalMark = plusMark - minusMark;

        const resultData = {
            questionId: formData._id,
            questionCategory: formData.questionCategory,
            questionTitle: formData.questionTitle,
            courseId: formData.courseId,
            questions: result, // Sending all question data with answers and correctness
            rightAnswers: rightAnswers, // Total correct answers
            wrongAnswers: wrongAnswers, // Total wrong answers
            totalMark: totalMark,
            atATime: examAtATime
        };

        try {
            const { status, result } = await postDataHandler(resultData, "POST", "/results/submit_question");

            if (status === 201) {
                toast.success(result.message);
                router.refresh();
                router.push("/profile/my-exams")
            } else {
                toast.error(result.message);
            }
        } catch (error) {
            toast.error("Error saving result");
        } finally {
            setLoading(false);
        }
    };

    if (formData === null) {
        return <Loading />;
    }


    let minutes = 0;
    let seconds = 0;

    if (timeStatus === "match") {
        minutes = Math.floor(remainingTime / 60);
        seconds = remainingTime % 60;
    } else if (timeStatus === "past") {
        minutes = Math.floor(examDuration / 60);
        seconds = examDuration % 60;
    }



    return (
        <div>
            < div className="min-h-screen flex items-center justify-center relative">
                {/* Exam Timer */}
                {
                    dateStatus === "future" || timeStatus === "future" ? null :
                        < div className="w-auto py-5 md:py-10 px-2 md:px-5 bg-gray-900 bg-opacity-95 rounded-md fixed top-[50%] right-0">
                            <h3 className="text-gray-300 flex items-center gap-2">
                                <span>{selectQuesCount}</span>
                                <strong className="text-blue-500">/</strong>
                                {totalQuesCount}
                            </h3>
                            <h4 className="text-xl text-gray-300 mt-3">
                                {minutes}:{seconds < 10 ? `0${seconds}` : seconds} <span className="mx-1">M</span>
                            </h4>
                        </div>
                }

                <div className="bg-white shadow-lg rounded-lg max-w-4xl w-full">
                    <h1 className="text-4xl font-bold text-gray-800 mb-8 text-center">Question Paper</h1>

                    <div className=" my-3 text-center">

                        {
                            // Check for date and time conditions and display appropriate message
                            dateStatus === "past" ?
                                <p className=" text-red-500 fadeIn animate-delay-1s">পরিক্ষার নির্ধারিত তারিখ শেষ হয়েছে!</p> :
                                dateStatus === "future" ?
                                    <p className=" text-yellow-600 fadeIn animate-delay-1s">পরিক্ষার তারিখ এখনো আসেনি!</p> :
                                    timeStatus === "past" ?
                                        <p className=" text-red-500 fadeIn animate-delay-1s">পরিক্ষার সময় শেষ হয়ে গেছে! </p> :
                                        timeStatus === "future" ?
                                            <p className=" text-yellow-500 fadeIn animate-delay-1s">পরিক্ষার সময় এখনো আসেনি!  <span className=" text-red-600 font-bold">
                                                {formData?.examTime} এ পরীক্ষা শুরু হবে।
                                            </span> </p> :
                                            <p className=" text-green-800 fadeIn animate-delay-1s"> পরীক্ষা চলছে</p>
                        }

                    </div>

                    <div className="border-b-2 pb-4 mb-8 text-gray-700">
                        <table className="table-auto w-full text-left border-collapse border border-gray-300 rounded-md">
                            <tbody>
                                <tr className="border-b border-gray-200">
                                    <td className="font-semibold py-2 px-4 border-r border-gray-200">Category:</td>
                                    <td className="py-2 px-4">{formData.questionCategory}</td>
                                </tr>
                                <tr className="border-b border-gray-200">
                                    <td className="font-semibold py-2 px-4 border-r border-gray-200">Course:</td>
                                    <td className="py-2 px-4">{formData.questionTitle}</td>
                                </tr>
                                <tr className="border-b border-gray-200">
                                    <td className="font-semibold py-2 px-4 border-r border-gray-200">Exam Date:</td>
                                    <td className="py-2 px-4">{new Date(formData.examDate).toLocaleDateString("en-US")}</td>
                                </tr>
                                <tr className="border-b border-gray-200">
                                    <td className="font-semibold py-2 px-4 border-r border-gray-200">Exam Time:</td>
                                    <td className="py-2 px-4">{formData.examTime}</td>
                                </tr>
                                <tr>
                                    <td className="font-semibold py-2 px-4 border-r border-gray-200">Duration:</td>
                                    <td className="py-2 px-4">{formData.examDuration} minutes</td>
                                </tr>
                            </tbody>
                        </table>
                    </div>

                    <div>
                        {

                            dateStatus === "future" || timeStatus === "future" ?
                                <div className=" w-full min-h-[25vh] flex items-center justify-center">
                                    <h2 className=" text-[18px] md:text-[22px] text-red-500">প্রশ্ন নির্ধারিত সময়ে চলে আসবে</h2>
                                </div>
                                :

                                formData !== null &&
                                formData.questions.map((item, index) => (
                                    <div key={index} className="my-6 p-5 bg-gray-50 border-l-4 border-blue-500 rounded-md shadow-sm">
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
                                                    <label htmlFor={`${item.questionId}-${idx}`} className="ml-3 text-gray-700">
                                                        {o}
                                                    </label>
                                                </div>
                                            ))}
                                        </div>
                                    </div>
                                ))}
                    </div>

                    <button
                        disabled={dateStatus === "future" || timeStatus === "future"}
                        onClick={handleQuestionSubmit}
                        className={`mt-6 bg-gradient-to-r from-blue-500 to-blue-400 text-white font-semibold py-3 px-6 rounded-lg shadow-md transform transition duration-300 w-full ${dateStatus === "future" || timeStatus === "future" ? 'cursor-not-allowed opacity-50' : 'hover:shadow-lg hover:scale-105'}`}
                    >
                        {loading
                            ? <Spinner />
                            : (dateStatus === "future" || timeStatus === "future")
                                ? "অপেক্ষা করুন"
                                : "সাবমিট করুন"}
                    </button>

                </div>
            </div>

        </div >
    );
}
