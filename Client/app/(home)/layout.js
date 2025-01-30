

import Footer from "../components/Globals/Footer";
import Navbar from "../components/Globals/Navbar/Navbar";
import "../globals.css"
import 'react-toastify/dist/ReactToastify.css';
import { ToastContainer } from 'react-toastify';
import Context from "../contextApi/Context";
import { defaultSeo } from "@/seo/defaultSeo";

export const metadata = defaultSeo

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body >
        <Context>
          <Navbar />
          <ToastContainer />
          {children}
          <Footer />
        </Context>
      </body>
    </html>
  );
}
