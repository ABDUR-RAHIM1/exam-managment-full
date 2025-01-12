
export const dateAndTimeCounters = (examTimers) => {
    const { examDate, examTime, examDuration } = examTimers;

    // Prepare dates
    const newExamDate = new Date(examDate); // Exam date
    const currentDate = new Date(); // Current date
    const examDurations = Number(examDuration) * 60;

    // Split and calculate total seconds for examTime
    const [examHours, examMinutes, examSeconds = 0] = examTime.split(":").map(Number);
    const totalExamStartTime = examHours * 3600 + examMinutes * 60 + examSeconds;
    const examEndTime = totalExamStartTime + examDurations;

    // Current time in seconds
    const currentHour = currentDate.getHours();
    const currentMinute = currentDate.getMinutes();
    const currentSeconds = currentDate.getSeconds();
    const totalCurrentTime = currentHour * 3600 + currentMinute * 60 + currentSeconds;

    // Checking date and time
    const isSameDate = newExamDate.toDateString() === currentDate.toDateString();
    const isSameTime = totalExamStartTime === totalCurrentTime;
    const remainingTime = Math.max(0, examEndTime - totalCurrentTime); // Prevent negative values
    const examDurationTime = Math.max(0, examDurations)

    let dateStatus = ""; // Status for date
    let timeStatus = ""; // Status for time

    // Determine date status
    if (isSameDate) {
        dateStatus = "match";
    } else if (newExamDate > currentDate) {
        dateStatus = "future";
    } else {
        dateStatus = "past";
    }

    // Determine time status (only if the date is a match)
    if (isSameDate) {
        if (totalExamStartTime > totalCurrentTime) {
            timeStatus = "future";
        } else if (totalCurrentTime > examEndTime) {
            timeStatus = "past";
        } else {
            timeStatus = "match";
        }
    } else {
        timeStatus = null; // No time comparison if the date doesn't match
    }


    // Return the statuses
    return {
        dStatus: dateStatus,
        tStatus: timeStatus,
        remainingTime: remainingTime,
        duration: examDurationTime,
    };
};
