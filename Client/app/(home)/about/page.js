import React from "react";
import { FaShieldAlt, FaUserFriends, FaChartLine } from "react-icons/fa";
import Image from "next/image";
import aboutPhoto from "@/public/Images/about.jpg"
import ceo from "@/public/Images/ceo.jpg"
import developer from "@/public/Images/developer.jpg"
import { demoProfilePhoto } from "@/app/DemoData/DemoImg";

export default function AboutPage() {

    const teamMembers = [
        {
            name: "আতাউল গনী",
            position: "CEO & Founder",
            photo: ceo,
            link: "https://web.facebook.com/ataulgoni120"
        },
        {
            name: "আব্দুর রহিম",
            position: "Lead Developer",
            photo: developer,
            link: "https://web.facebook.com/Aabdurrahim.17"
        },
        {
            name: "মাহাবুর রহমান",
            position: "CTO",
            photo: demoProfilePhoto,
            link: "facebook.com"
        },
        {
            name: "হারুন আর রশিদ",
            position: "Digital Marketer",
            photo: demoProfilePhoto,
            link: "facebook.com"
        },
    ]


    return (
        <div className="about-page bg-gradient-to-b from-blue-100 to-white py-16 px-8">
            {/* Hero Section */}
            <div className="text-center mb-16">
                <h1 className="text-5xl font-extrabold text-blue-700">আমাদের সম্পর্কে</h1>
                <p className="text-lg text-gray-600 mt-4">
                    শিক্ষকদের এবং শিক্ষার্থীদের উপর আধুনিক অনলাইন পরীক্ষা সমাধানের মাধ্যমে শক্তি দেওয়া।
                </p>
                <div className="mt-8 bg-white w-full">
                    <Image
                        src={aboutPhoto}
                        width={1000}
                        height={1000}
                        alt="Online Exam Management"
                        className="w-full h-auto md:h-[60vh] rounded-lg shadow-lg"
                    />
                </div>
            </div>

            {/* Mission and Vision Section */}
            <div className="grid md:grid-cols-2 gap-12 mb-16">
                <div className="bg-white shadow-lg p-8 rounded-lg">
                    <h2 className="text-3xl font-semibold text-blue-500 mb-4">আমাদের মিশন</h2>
                    <p className="text-gray-700 text-base leading-7">
                        আমরা সরকারী চাকরি, বেসরকারী চাকরি এবং এডমিশনে (পূর্নাঙ্গ সেলেবাস) প্রিলিমিনারি / নৈর্ব্যক্তিক পরীক্ষা সংক্রান্ত মূল্যবোধ করি, যা আমাদের অটোমেটিকেলি ওয়েবসাইট দ্বারা পরিচালিত হয়। যার মাধ্যমে ঘরে বসে সবাই আমাদের ওয়েবসাইটের মাধ্যমে নিজেকে জাচাই করতে পারেন এবং লক্ষ অর্জন করতে সক্ষম হতে পারে।
                    </p>
                </div>
                <div className="bg-white shadow-lg p-8 rounded-lg">
                    <h2 className="text-3xl font-semibold text-blue-500 mb-4">আমাদের ভিসন</h2>
                    <p className="text-gray-700 text-base leading-7">
                        আমরা এই প্রতিষ্ঠানকে শিক্ষাকে একটি অপরিহার্য অংশ হিসাবে ডিজিটালাইজড করার চেষ্টা করি। আমরা আগামিতে প্রিলিমিনারি এবং পাশাপাশি রিটেনের নিয়ে কাজ করবো। এছাড়াও, সারা বিশ্বের অনলাইন শিক্ষকদের জন্য শিক্ষাদানের গুরুত্বপূর্ণ অংশ হিসাবে গড়েতোলা হবে।
                    </p>
                </div>
            </div>

            {/* Features Section */}
            <div className="mb-16">
                <h2 className="text-4xl font-bold text-blue-500 text-center mb-10">
                    কেন আমাদের বাছাই করবেন?
                </h2>
                <div className="grid md:grid-cols-3 gap-8">
                    <div className="feature bg-white shadow-lg p-6 rounded-lg text-center">
                        <FaShieldAlt className="text-4xl text-blue-500 mx-auto mb-4" />
                        <h3 className="text-xl font-semibold text-gray-800">নিরাপত্তা সংক্রান্ত পরীক্ষা</h3>
                        <p className="text-gray-600 mt-2">
                            এগিয়ে চলুন অভ্যন্তরীণ প্রধান দ্বারা নিশ্চিত হওয়া
                        </p>
                    </div>
                    <div className="feature bg-white shadow-lg p-6 rounded-lg text-center">
                        <FaUserFriends className="text-4xl text-blue-500 mx-auto mb-4" />
                        <h3 className="text-xl font-semibold text-gray-800">
                            ব্যবহারকারী-মন্তব্য ইন্টারফেস
                        </h3>
                        <p className="text-gray-600 mt-2">
                            সমস্ত ব্যবহারকারীর জন্য অনলাইন নেভিগেশনের জন্য মহত্বপূর্ণ উন্নত ডিজাইন
                        </p>
                    </div>
                    <div className="feature bg-white shadow-lg p-6 rounded-lg text-center">
                        <FaChartLine className="text-4xl text-blue-500 mx-auto mb-4" />
                        <h3 className="text-xl font-semibold text-gray-800">বিশ্লেষণ</h3>
                        <p className="text-gray-600 mt-2">
                            ভাল নির্ণয় গ্রহণের জন্য কর্মক্ষমতা উপর বিস্তারিত অংশ
                        </p>
                    </div>
                </div>
            </div>

            {/* Team Section */}
            <div className="team-section text-center">
                <h2 className="text-4xl font-bold text-blue-500 mb-10">আমাদের টিম</h2>
                <div className="flex flex-wrap justify-center gap-8">
                    {
                        teamMembers.map((team, index) => (
                            <div key={index} className="team-member bg-white shadow-lg p-6 rounded-lg w-full sm:w-[45%] md:w-[22%]">
                                <Image
                                    width={250}
                                    height={250}
                                    src={team.photo}
                                    alt="tickmarkq team member"
                                    className="w-24 h-24 mx-auto rounded-full mb-4"
                                />
                                <a href={team.link} target="_blank" className=" inline-block text-lg font-semibold text-gray-800 hover:text-blue-500 transition-all">{team.name}</a>
                                <p className="text-sm text-gray-500 uppercase">{team.position}</p>
                            </div>
                        ))
                    }

                </div>
            </div>

        </div>
    );
}
