"use client"
import React, { useState } from 'react'

export default function TestPage() {

    const [formData, setFormData] = useState({})

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value })
    }



    const [dateMatch, setDateMatch] = useState("future")
    const [timeMatch, setTimeMatch] = useState("future")
    const [atAtime, setAtaTime] = useState(false)

    const handleSubmit = (e) => {
        e.preventDefault();
        const examDate = formData.examDate; // exam date (e.g., '2025-01-08')
        const examTime = formData.examTime; // exam time (e.g., '14:43')
        const examDuration = formData.duration; // exam duration in minutes (e.g., 20)

        // ========== Exam Time ==========
        const [hour, minute] = examTime.split(":").map(Number); // Splitting exam time to hours and minutes
        const examTimeInSeconds = hour * 3600 + minute * 60; // Converting exam time to seconds
        const examDurationInSeconds = Number(examDuration) * 60; // Converting duration to seconds
        const endTime = examTimeInSeconds + examDurationInSeconds; // End time of the exam in seconds

        // ========== Current Time ==========
        const dateNow = new Date();
        const hours = dateNow.getHours();
        const minutes = dateNow.getMinutes();
        const seconds = dateNow.getSeconds();
        const totalSecondsNow = hours * 3600 + minutes * 60 + seconds; // Current time in seconds

        // Logging current time and exam time for comparison
        console.log("Current Time in Seconds:", totalSecondsNow);
        console.log("Exam Start Time in Seconds:", examTimeInSeconds);
        console.log("Exam End Time in Seconds:", endTime);

        // Now comparing the times (for the exam)
        // if (totalSecondsNow < examTimeInSeconds) {
        //     console.log("Future");
        //     setTimeMatch("future")
        // } else if (totalSecondsNow > endTime) {
        //     console.log("Past");
        //     setTimeMatch("past")
        // } else {
        //     console.log("Match");
        //     setTimeMatch("match")
        //     setAtaTime(true)
        // }

        // ========== Date Comparison ==========
        const exacExamDate = new Date(examDate).toLocaleDateString(); // Exam date formatted
        const exacNowDate = new Date().toLocaleDateString(); // Current date formatted

        const xExam = new Date(exacExamDate); // Creating Date object for exam date
        const yNow = new Date(exacNowDate); // Creating Date object for current date

        // Comparing the dates
        if (yNow > xExam) {
            setDateMatch('past')
            setAtaTime(false)
        } else if (yNow < xExam) {
            setDateMatch("future")
            setAtaTime(false)
        } else {
            // now cheking the time
            setDateMatch("match")
            if (totalSecondsNow < examTimeInSeconds) {
                console.log("Future");
                setTimeMatch("future")
                setAtaTime(false)
            } else if (totalSecondsNow > endTime) {
                console.log("Past");
                setTimeMatch("past")
                setAtaTime(false)
            } else {
                console.log("Match");
                setTimeMatch("match")
                setAtaTime(true)
            }
        }
    };


    return (
        <div className='w-full h-screen p-20'>

            <form onSubmit={handleSubmit} >
                <input type="date" name='examDate' onChange={handleChange} />
                <input type="time" name='examTime' onChange={handleChange} />
                <input type="text" name='duration' onChange={handleChange} placeholder='Duration' />

                <button className=' my-4 bg-red-600 p-2'>Submit</button>
            </form>

            <div className=' my-10'>
                <h1>Output</h1>
                <p>
                    {dateMatch === "past" ? "Date Is Pasted" : dateMatch === "future" ? "Upcoming Date" : "match Date"}
                </p>

                <p>
                    {
                        timeMatch === "past" ? "Time Is Pasted" : timeMatch === "future" ? "Time Upcoming" : "Match The Time"
                    }
                </p>

                <p>
                    At A Time : {atAtime ? "true" : "false"}
                </p>
            </div>


        </div>
    )
}
