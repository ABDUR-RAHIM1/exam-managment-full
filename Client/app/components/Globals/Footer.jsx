import Link from 'next/link';
import React from 'react';
import { FaFacebookF, FaTwitter, FaLinkedinIn, FaInstagram } from 'react-icons/fa'; // For social media icons

export default function Footer() {
    return (
        <footer className="bg-gray-100 text-gray-800 py-10">
            <div className="wrap mx-auto grid grid-cols-1 md:grid-cols-3 gap-8 px-5 md:px-20">
                {/* Column 1: About */}
                <div className="space-y-4">
                    <h3 className="text-2xl font-bold text-gray-900">  আমাদের সম্পর্কে</h3>
                    <p className="text-sm text-gray-600">

                        আমরা প্রতিযোগিতামূলক পরীক্ষার জন্য সেরা উপকরণ, মক টেস্ট, এবং বিশেষজ্ঞ পরামর্শ প্রদান করি।
                    </p>
                </div>

                {/* Column 2: Quick Links */}
                <div className="space-y-4">
                    <h3 className="text-2xl font-bold text-gray-900">গুরুত্বপূর্ণ লিঙ্ক</h3>
                    <ul className="text-sm space-y-2">
                        <li><a href="#" className="hover:text-blue-600 transition-all">Home</a></li>
                        <li><a href="#" className="hover:text-blue-600 transition-all">Courses</a></li>
                        <li><a href="#" className="hover:text-blue-600 transition-all">Exam Dates</a></li>
                        <li><a href="#" className="hover:text-blue-600 transition-all">Contact Us</a></li>
                        <li><Link href="/about" className="hover:text-blue-600 transition-all">About Us</Link></li>
                    </ul>
                </div>

                {/* Column 3: Contact & Social Media */}
                <div className="space-y-4">
                    <h3 className="text-2xl font-bold text-gray-900">যোগাযোগের তথ্য</h3>
                    <p className="text-sm text-gray-600">Email: tickmarkq@gmail.com</p>
                    <p className="text-sm text-gray-600">Phone: +880 17-806-96448</p>
                    <div className="flex space-x-6 mt-6">
                        <a href="#" className="hover:text-blue-600 transition-all text-xl"><FaFacebookF /></a>
                        <a href="#" className="hover:text-blue-600 transition-all text-xl"><FaTwitter /></a>
                        <a href="#" className="hover:text-blue-600 transition-all text-xl"><FaLinkedinIn /></a>
                        <a href="#" className="hover:text-blue-600 transition-all text-xl"><FaInstagram /></a>
                    </div>
                </div>
            </div>

            {/* Footer Bottom */}
            <div className="mt-8 border-t border-gray-300 pt-4 text-center text-sm text-gray-600">
                <p>&copy; {new Date().getFullYear()} <span className=' text-red-500'>TickmarkQ</span>- Exam Application. All rights reserved.</p>
            </div>
        </footer>
    );
}
