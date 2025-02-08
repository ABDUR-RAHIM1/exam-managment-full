
import "../globals.css";
import 'react-toastify/dist/ReactToastify.css';
import { ToastContainer } from 'react-toastify';
import Context from "../contextApi/Context";
import DashNav from "./dashboard/dashboardComponent/DashNav";
import Sidebar from "./dashboard/dashboardComponent/Sidebar";
import { defaultSeo } from "@/seo/defaultSeo";

export async function generateMetadata() {
    return {
        title: defaultSeo.title,
        description: defaultSeo.description,
        keywords: defaultSeo.keywords.join(", "),
        authors: defaultSeo.authors,
        robots: defaultSeo.robots,
        icons: defaultSeo.icons,
    };
}

export default function DashboardLayout({ children }) {
    return (
        <html lang="en">
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
