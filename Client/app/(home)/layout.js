

import Footer from "../components/Globals/Footer";
import Navbar from "../components/Globals/Navbar/Navbar";
import "../globals.css"
import 'react-toastify/dist/ReactToastify.css';
import { ToastContainer } from 'react-toastify';
import Context from "../contextApi/Context";
import { defaultSeo, getSeo } from "@/seo/defaultSeo";
import ChatBox from "../components/Globals/ChatBox";

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

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body >
        <Context>
          <Navbar />
          <ToastContainer />
          {children}
          <Footer />
          <ChatBox />
        </Context>
      </body>
    </html>
  );
}
