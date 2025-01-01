import Link from 'next/link';
import React from 'react';
import { FaFacebookF, FaTwitter, FaLinkedinIn, FaInstagram } from 'react-icons/fa'; // For social media icons

export default function Footer() {
    return (
        <footer className="bg-gray-100 text-gray-800 py-10">
            <div className="wrap mx-auto grid grid-cols-1 md:grid-cols-3 gap-8 px-5 md:px-20">
                {/* Column 1: About */}
                <div className="space-y-4">
                    <h3 className="text-2xl font-bold text-gray-900">About Us</h3>
                    <p className="text-sm text-gray-600">
                        We are dedicated to helping students prepare for competitive exams with the best study materials, mock tests, and tips from professionals.
                    </p>
                </div>

                {/* Column 2: Quick Links */}
                <div className="space-y-4">
                    <h3 className="text-2xl font-bold text-gray-900">Quick Links</h3>
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
                    <h3 className="text-2xl font-bold text-gray-900">Contact Us</h3>
                    <p className="text-sm text-gray-600">Email: support@examapp.com</p>
                    <p className="text-sm text-gray-600">Phone: +880 123-456-7890</p>
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
                <p>&copy; {new Date().getFullYear()} Online Exam Application. All rights reserved.</p>
            </div>
        </footer>
    );
}
