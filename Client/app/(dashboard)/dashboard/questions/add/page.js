"use client";
import { postDataHandler } from "@/app/actions/users/postData";
import { publicCourseGet, questionAdd } from "@/app/constans/constans";
import { contextApi } from "@/app/contextApi/Context";
import useClientDataHandler from "@/app/Handler/usersHandler/useClientDataHandler";
import React, { useContext, useEffect, useState } from "react";
import { toast } from "react-toastify";
import { v4 as uuidv4 } from 'uuid';  // Import uuid to generate unique IDs

export default function AddQuestion() {
    const { manageData } = useContext(contextApi)
    const getClientDataHandler = useClientDataHandler();
    const [title, setTitle] = useState(""); // filter title from backend
    const [courseData, setCourseData] = useState(null);
    const [loading, setLoading] = useState(false)

    console.log(manageData)

    const isEditablePaper = manageData && Object.keys(manageData).length > 0


    /// select course data fecting 
    useEffect(() => {
        const fetchData = async () => {
            const data = await getClientDataHandler(publicCourseGet);
            setCourseData(data);
        };

        fetchData();
    }, []);




    // <====== Set Question Categorie , title and _id based On title Filtering  ==========>
    useEffect(() => {
        const filterByTitle = courseData?.find(
            (f1) => f1.title.toLocaleLowerCase() === title.toLocaleLowerCase()
        );

        setQuesHeader({
            ...quesHeader,
            questionCategory: filterByTitle?.category,
            questionTitle: filterByTitle?.title,
            courseId: filterByTitle?._id,
        });
    }, [title]);


    // ==================================
    //  Questions Header / utils
    // ==================================
    const [quesHeader, setQuesHeader] = useState({
        questionCategory: "",
        questionTitle: "",
        courseId: "",
        examDate: "",
        examTime: "",
        examDuration: ""
    })

    const handleQuesHeader = (e) => {
        const { name, value } = e.target;
        setQuesHeader((prev) => ({ ...prev, [name]: value }))
    }
    // ==================================
    //  Questions Header / utils End
    // ==================================



    const [questions, setQuestions] = useState([]);
    const [newQuestion, setNewQuestion] = useState({
        questionId: '', // Initialize as an empty string or null
        questionText: '',
        options: ['', '', '', ''],
        selectedAns: '',
        correctAns: '',
        clarification: ""
    });

    const [editingIndex, setEditingIndex] = useState(null);  // Track which question is being edited
    // Handle input changes for question text and other fields
    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setNewQuestion((prev) => ({
            ...prev,
            [name]: value,
        }));
    };

    // Handle changes for option inputs
    const handleOptionChange = (index, value) => {
        const updatedOptions = [...newQuestion.options];
        updatedOptions[index] = value;
        setNewQuestion((prev) => ({
            ...prev,
            options: updatedOptions,
        }));
    };

    // Add or update a question
    const handleAddQuestion = () => {
        if (editingIndex !== null) {
            // If editing, update the question with the same ID
            const updatedQuestions = [...questions];
            updatedQuestions[editingIndex] = newQuestion;
            setQuestions(updatedQuestions);
            setEditingIndex(null);  // Reset the edit index after update
        } else {
            // If adding, assign a new unique ID
            setQuestions((prev) => [
                ...prev,
                { ...newQuestion, questionId: uuidv4() }, // Use uuidv4() to generate a unique ID
            ]);
        }
        // <=========== Reset the new question state =============>
        setNewQuestion({
            questionId: '',
            questionText: '',
            options: ['', '', '', ''],
            selectedAns: '',
            correctAns: '',
            clarification: ''
        });
    };

    // <===========   Edit a Single question ==================>
    const handleEditQuestion = (index) => {
        setNewQuestion(questions[index]);
        setEditingIndex(index); // Set the index of the question being edited
    };


    //  <========= Edit Question Paper With Question _Id ===============>
    //     questionCategory: "",
    // questionTitle: "",
    // courseId: "",
    // examDate: "",
    // examTime: "",
    // examDuration: ""
    useEffect(() => {
        if (isEditablePaper) {
            setQuesHeader({
                ...quesHeader,
                questionCategory: manageData.questionCategory,
                questionTitle: manageData.questionTitle,
                courseId: manageData.courseId,
                examDate: manageData.examDate,
                examTime: manageData.examTime,
                examDuration: manageData.examDuration,
            })
            setQuestions(manageData.questions)
        }
    }, [])

    console.log(quesHeader, questions)




    // <============= Questions Submit Handler ===================>
    const handleQuestionSubmit = async () => {
        setLoading(true)
        const dataToSend = {
            questionCategory: quesHeader.questionCategory,
            questionTitle: quesHeader.questionTitle,
            courseId: quesHeader.courseId,
            examDate: quesHeader.examDate,
            examTime: quesHeader.examTime,
            examDuration: quesHeader.examDuration,
            questions: questions
        };

        try {
            const { status, result } = await postDataHandler(dataToSend, "POST", questionAdd)

            if (status === 201) {
                toast.success(result.message)
            } else if (status !== 200 || status !== 201) {
                toast.error(result.message)
            }
        } catch (error) {
            console.error('Error:', error);
        } finally {
            setLoading(false)
        }
    };

    // <============= Questions Update Handler ===================>
    const handleQuestionUpdate = async () => {
        setLoading(true)
        const dataToSend = {
            questionCategory: quesHeader.questionCategory,
            questionTitle: quesHeader.questionTitle,
            courseId: quesHeader.courseId,
            examDate: quesHeader.examDate,
            examTime: quesHeader.examTime,
            examDuration: quesHeader.examDuration,
            questions: questions
        };

        try {
            // const { status, result } = await postDataHandler(dataToSend, "POST", questionAdd)

            // if (status === 201) {
            //     toast.success(result.message)
            // } else if (status !== 200 || status !== 201) {
            //     toast.error(result.message)
            // }
            alert("Working For The Functionality")

            console.log(dataToSend)
        } catch (error) {
            console.error('Error:', error);
        } finally {
            setLoading(false)
        }
    };


    return (
        <div className=" bg-gray-100  px-8 py-5 rounded-md">

            <div className="w-[90%] mx-auto px-5 py-10 rounded-md bg-white" >
                <div className="p-4 my-10">
                    <div className="my-3">
                        <h4 className="my-2 font-bold">Question Category</h4>
                        <select
                            onChange={(e) => setTitle(e.target.value)}
                            name="questionTitle"
                            required
                            className="input"
                        >
                            {courseData &&
                                courseData.map((c, index) => (
                                    <option key={index} value={c.title}>
                                        {c.title}
                                    </option>
                                ))}
                        </select>
                    </div>

                    <div className="my-3">
                        <h4 className="my-2 font-bold">Exam Date</h4>
                        <input
                            onChange={handleQuesHeader}
                            type="date"
                            name="examDate"
                            value={quesHeader.examDate}
                            required
                            className="input"
                        />
                    </div>
                    <div className="my-3">
                        <h4 className="my-2 font-bold">Exam Time</h4>
                        <input
                            onChange={handleQuesHeader}
                            type="time"
                            name="examTime"
                            value={quesHeader.examTime}
                            required
                            className="input"
                        />
                    </div>
                    <div className="my-3">
                        <h4 className="my-2 font-bold">Exam Duration</h4>
                        <input
                            onChange={handleQuesHeader}
                            type="text"
                            name="examDuration"
                            value={quesHeader.examDuration}
                            required
                            placeholder="Exam Duration"
                            className="input"
                        />
                    </div>
                </div>


                <div className="mb-6">
                    <h2 className="text-2xl font-semibold mb-4">{editingIndex !== null ? 'Edit Question' : 'Add New Question'}</h2>
                    <input
                        type="text"
                        name="questionText"
                        value={newQuestion.questionText}
                        onChange={handleInputChange}
                        className="input"
                        placeholder="Enter Question"
                    />
                    {newQuestion.options.map((option, index) => (
                        <div key={index} className="mb-3">
                            <h4 className="my-2 font-bold">Option {index + 1}</h4>
                            <input
                                type="text"
                                value={option}
                                onChange={(e) => handleOptionChange(index, e.target.value)}
                                className="input"
                                placeholder={`Option ${index + 1}`}
                            />
                        </div>
                    ))}

                    <div className="my-3">
                        <h4 className="my-2 font-bold">Correct Answer</h4>
                        <input
                            type="text"
                            name="correctAns"
                            value={newQuestion.correctAns}
                            onChange={handleInputChange}
                            className="input"
                            placeholder="Enter Correct Answer"
                            required
                        />
                    </div>

                    <div className="my-3">
                        <h4 className="my-2 font-bold">Answer Clarification</h4>
                        <textarea
                            rows={5}
                            type="text"
                            name="clarification"
                            value={newQuestion.clarification}
                            onChange={handleInputChange}
                            className="input"
                            placeholder="Correct Answer Desciption"
                        />
                    </div>
                    <button
                        onClick={handleAddQuestion}
                        className="w-full py-3 bg-blue-500 text-white font-semibold rounded-md hover:bg-blue-600 transition duration-200"
                    >
                        {editingIndex !== null ? 'Update Question' : 'Add Question'}
                    </button>
                </div>

            </div>


            {/* Preview Section */}

            <div className="my-10">
                <h2 className="text-2xl font-semibold mb-4">Added Questions</h2>
                {questions.length === 0 ? (
                    <p className="text-gray-500">No questions added yet.</p>
                ) : (
                    questions.map((q, index) => (
                        <div key={q.questionId} className="bg-gray-50 p-4 rounded-md mb-4 shadow-md">
                            <p className="font-semibold"> <strong>{index + 1 + " ."}</strong> {q.questionText}</p>
                            <ul className="ml-4 mt-2 space-y-2">
                                {q.options.map((opt, idx) => (
                                    <li key={idx} className="text-gray-700">
                                        <strong>{String.fromCharCode(97 + idx)}. </strong>
                                        {opt}</li>
                                ))}
                            </ul>
                            <p className="mt-2 text-sm text-gray-500"> <strong className="text-blue-900">Correct Answer:</strong> {q.correctAns}</p>
                            <p className="mt-2 text-sm text-gray-500"> <strong className="text-blue-900">Clarification:</strong> {q.clarification}</p>
                            <button
                                onClick={() => handleEditQuestion(index)}
                                className="mt-4 py-1 px-4 bg-yellow-500 text-white rounded-md hover:bg-yellow-600 transition duration-200"
                            >
                                Edit
                            </button>
                        </div>
                    ))
                )}
            </div>

            <div onClick={isEditablePaper ? handleQuestionUpdate : handleQuestionSubmit} className="my-5">
                <button className="w-full py-3 bg-blue-500 text-white font-bold rounded-md">
                    {
                        loading ? "Uploading . . . " : isEditablePaper ? "Update Question Paper" : "Submit Question Paper"
                    }
                </button>
            </div>
        </div>
    );
}
