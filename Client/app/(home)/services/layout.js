import Sidebar from "./Sidebar";


// Metadata for the page
export const metadata = {
    title: "Online Exam Services - Prepare for Success with Mock Tests & Resources",
    description: "Access top-notch online exam services, mock tests, and free study resources to boost your exam preparation. Suitable for competitive exams, job placement tests, and more.",
    keywords: "online exams, mock tests, study resources, competitive exams, exam preparation, free learning resources, job exam practice",
};




export default function ServicesLayout({ children }) {

    return (

        <div className="flex flex-col md:flex-row bg-gray-50 my-0">
            {/* Main Content */}
            <main className="flex-1 px-4 py-5 border-b md:border-b-0 md:border-r border-gray-200">
                {children}
            </main>

            {/* Sidebar */}
            <Sidebar />
        </div>

    );
}
