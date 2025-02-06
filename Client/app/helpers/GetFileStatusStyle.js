 
export const getFileStatusClass = (status) => {
    if (status === 102) return "text-yellow-500";
    if (status === 200) return "text-green-600";
    if (!status) return "text-black";
    return "text-red-500";
};