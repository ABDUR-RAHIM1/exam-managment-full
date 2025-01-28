import { FaRegCircleQuestion } from "react-icons/fa6";
import { MdAdd, MdOutlineDashboardCustomize } from "react-icons/md";
import { TbDeviceTabletQuestion } from "react-icons/tb"
import { SiThefinals } from "react-icons/si"
import { BiSolidPurchaseTag } from "react-icons/bi"
import { IoCreate } from "react-icons/io5";
import { BsClipboardDataFill, BsFillPeopleFill } from "react-icons/bs";
import { GrCertificate } from "react-icons/gr";
import { CiSettings } from "react-icons/ci";
import { GrUserAdmin } from "react-icons/gr";
import { VscFeedback } from "react-icons/vsc";

const items = [
    {
        parentItem: "Home",
        childItem: [
            { icon: <MdOutlineDashboardCustomize />, item: "Dashboard", path: "/dashboard" },
        ],
    },
    {
        parentItem: "Questions",
        childItem: [
            { icon: <FaRegCircleQuestion />, item: "Add Question", path: "/dashboard/questions/add" },
            { icon: <TbDeviceTabletQuestion />, item: "All Questions", path: "/dashboard/questions/all" },
        ],
    },
    {
        parentItem: "Courses",
        childItem: [
            { icon: <IoCreate />, item: "Create Course", path: "/dashboard/courses/add" },
            { icon: <BsClipboardDataFill />, item: "All Course", path: "/dashboard/courses/all" },
            { icon: <BiSolidPurchaseTag />, item: "Purchase", path: "/dashboard/courses/purchase" },
        ],
    },
    {
        parentItem: "Results",
        childItem: [
            { icon: <SiThefinals />, item: "Exam Results", path: "/dashboard/exam-results" },
            { icon: <GrCertificate />, item: "Certificate", path: "/dashboard/results/certificate" },
        ],
    },
    {
        parentItem: "People",
        childItem: [
            { icon: <MdAdd />, item: "Add Modaretor", path: "/dashboard/people/add-modaretor" },
            { icon: <GrUserAdmin />, item: "Modaretor List", path: "/dashboard/people/modaretor-list " },
            { icon: <BsFillPeopleFill />, item: "Users", path: "/dashboard/people/users-list " },
            { icon: <VscFeedback />, item: "Testimonials", path: "/dashboard/people/testimonials " },
        ],
    },
    {
        parentItem: "Blogs",
        childItem: [
            { icon: <BsFillPeopleFill />, item: "Admin Blogs", path: "/dashboard/people/blogs/admin " },
            { icon: <BsFillPeopleFill />, item: "Public Blogs", path: "/dashboard/people/blogs/public " },
        ],
    },
    {
        parentItem: "Content",
        childItem: [
            { icon: <BsFillPeopleFill />, item: "Sliders", path: "/dashboard/content/sliders" },
            { icon: <BsFillPeopleFill />, item: "Headline", path: "/dashboard/content/headline" },
            { icon: <BsFillPeopleFill />, item: "Notice", path: "/dashboard/content/notice-board" },
            { icon: <BsFillPeopleFill />, item: "Quick Links", path: "/dashboard/content/quick-links" },
            { icon: <BsFillPeopleFill />, item: "Course Info", path: "/dashboard/content/course-info" },
            { icon: <BsFillPeopleFill />, item: "Why Choose", path: "/dashboard/content/why-choose" },
            { icon: <BsFillPeopleFill />, item: "About Page", path: "/dashboard/content/about" },
            { icon: <BsFillPeopleFill />, item: "Logo", path: "/dashboard/content/logo" },
        ],
    },
    {
        parentItem: "Settings",
        childItem: [
            { icon: <CiSettings />, item: "Profile Settings", path: "/dashboard/settings/profile" },
            { icon: <CiSettings />, item: "Account Settings", path: "/dashboard/settings/account" },
        ],
    },
];

export default items