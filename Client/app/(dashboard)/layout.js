
import "../globals.css";
import logo from "@/public/Images/logo.png"
import 'react-toastify/dist/ReactToastify.css';
import { ToastContainer } from 'react-toastify';
import Context from "../contextApi/Context";
import DashNav from "./dashboard/dashboardComponent/DashNav";
import Sidebar from "./dashboard/dashboardComponent/Sidebar";
import Head from "next/head";

export const metadata = {
    title: "TickmarkQ - Online Exam Management Dashboard",
    description: "Manage online exams, track student progress, and view detailed analytics with TickmarkQ. Simplify your online exam management with powerful features.",
    keywords: "Online Exam, Exam Management, Student Progress, Analytics, Dashboard, TickmarkQ, Exam Dashboard, Education, Learning Management",
    author: "TickmarkQ Team",
};

export default function DashboardLayout({ children }) {
    return (
        <html lang="en" cz-shortcut-listen>
            <Head>
                <link rel="icon" type="image/png" href={logo} />
            </Head>
            <body className="bg-gray-200 h-screen md:overflow-hidden text-gray-900">
                <Context>
                    <ToastContainer />
                    <header className="w-full">
                        <DashNav />
                    </header>
                    <div className=" block md:flex h-screen ">
                        <aside className=" hidden md:block h-full">
                            <Sidebar />
                        </aside>

                        <main className="flex-1 pt-28 px-2 md:px-5  bg-white rounded-md overflow-y-auto">
                            {children}
                        </main>
                    </div>

                </Context>
            </body>
        </html>
    );
}
