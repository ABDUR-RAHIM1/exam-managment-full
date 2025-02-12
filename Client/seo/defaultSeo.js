import { API_URL, seoPostUpdate } from "@/app/constans/constans";

export const defaultSeo = {
    title: "TickMarkQ - Online Exam Management System",
    description: "TickMarkQ - The ultimate online exam management system. Conduct exams, get instant results, access automatic grading, read blogs, and explore our PDF book reader.",
    keywords: [
        "online exam",
        "TickMarkQ",
        "Job Ready Course",
        "exam management",
        "instant result",
        "automatic grading",
        "online test",
        "blog",
        "PDF book reader",
        "digital learning",
    ],
    authors: [{ name: "TickMarkQ Team", url: "https://www.tickmarkq.com" }],
    robots: "index, follow",
    icons: {
        icon: '/logo.png',
    },
};


export const getSeo = async () => {
    const response = await fetch(API_URL + seoPostUpdate);
    const data = await response.json(); 
    return data
}