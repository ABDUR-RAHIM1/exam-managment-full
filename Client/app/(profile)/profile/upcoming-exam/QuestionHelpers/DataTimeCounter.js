
import React, { useEffect, useState } from 'react'

export default function DataTimeCounter(examTimers) {
    const [count, setCount] = useState(0); // just demo delete letter
    const [dateStatus, setDateStatus] = useState("")
    const [timeStatus, setTimeStatus] = useState("")
    const { examDate, examTime, examDuration } = examTimers;

    // Validation to ensure examDate and examTime are valid
    // if (!examDate || !examTime || !examDuration) {
    //     console.error("Invalid examDate or examTime");
    //     return;
    // }

    useEffect(() => {



        const newExamDate = new Date(examDate); //  examDate form Question
        const currentDate = new Date(); // current Date
        console.log(examTime)
        // times
        const [examHours, examMinutes] = examTime.split(":").map(Number);
        console.log(examHours, examMinutes)
        // const totalExamTime = examHour * 3600 + examMinute * 60 + examSeconds;

        const currentHour = currentDate.getHours();
        const currentMinute = currentDate.getMinutes();
        const currentSeconds = currentDate.getSeconds();
        const totalCurrentTime = currentHour * 3600 + currentMinute * 60 + currentSeconds;

        // new examDate and currentDate-only for Data matching
        const isSameDate = newExamDate.toDateString() === currentDate.toDateString();
        // const isSameTime = totalExamTime === totalCurrentTime;
        // // cheking time
        // if (isSameTime) {
        //     console.log("TIme Same")
        // } else if (totalExamTime > totalCurrentTime) {
        //     console.log("Exam time is in the future.");
        // } else {
        //     console.log("Exam time is in the past.");
        // }


        if (isSameDate) {
            console.log(`The dates are the same.`);
            setDateStatus("match");


        } else if (newExamDate > currentDate) {
            console.log(`Exam date is in the future.`);
            setDateStatus("future")
        } else {
            console.log(`Current date is in the past.`);
            setDateStatus("past")
        }
    }, [examTimers]);

    console.log(dateStatus)
    return { count }
}
