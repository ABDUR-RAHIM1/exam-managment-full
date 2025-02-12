import "../globals.css";

import 'react-toastify/dist/ReactToastify.css';
import { ToastContainer } from 'react-toastify';
import Context from "../contextApi/Context";
import MobileNavbar from "../components/Globals/Navbar/Navbar";
import { defaultSeo, getSeo } from "@/seo/defaultSeo";

export async function generateMetadata() {
  const data = await getSeo();
  const seoData = data && Object.keys(data).length > 0 ? data : defaultSeo;

  return {
    title: seoData.title,
    description: seoData.description,
    keywords: seoData.keywords.join(', '),
    icons: seoData.icons,
    authors: [{ name: "TickMarkQ Team", url: "https://www.tickmarkq.com" }],
    robots: "index, follow",
  }
}

export default function ProfileLayout({ children }) {

    return (
        <html lang="en">
            <body className="bg-gray-200  text-gray-900">
                <Context>
                    <MobileNavbar />

                    {/* Main Content */}
                    <main className="w-full z-[50] p-2 md:p-10 bg-white rounded-md ">
                        {children}
                        <div className="h-10"></div>
                    </main>
                </Context>
                <ToastContainer />
            </body>
        </html>
    );
}
