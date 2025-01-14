 
 
 export const FormatedTime = (time24) => { 
    const [hours, minutes] = time24.split(":").map(Number);
    const period = hours >= 12 ? "PM" : "AM";
    const hours12 = hours % 12 || 12; // 0 টা ১২ হিসেবে দেখাবে
    return `${hours12}:${minutes.toString().padStart(2, "0")} ${period}`;
};

 