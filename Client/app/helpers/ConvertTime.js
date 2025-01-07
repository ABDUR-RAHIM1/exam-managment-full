function time12(time24) {
    // Split the time string into hours and minutes
    const [hours, minutes] = time24.split(':').map(Number);

    const period = hours >= 12 ? 'PM' : 'AM';
    const hours12 = hours % 12 || 12;

    return `${hours12}:${String(minutes).padStart(2, '0')} ${period}`;
}

export default time12