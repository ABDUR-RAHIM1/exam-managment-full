import { CiViewBoard , CiBoxList , CiSettings } from "react-icons/ci";
import { MdUpcoming , MdOutlinePayments , MdSpeakerNotes } from "react-icons/md";
import { VscOutput } from "react-icons/vsc";
const ProfileItems = [
    {
        item: "Profile Overview",
        icon: <CiViewBoard />,
        path: "/profile"
    },
    {
        item: "Course Lists",
        icon: <CiBoxList />,
        path: "/profile/course-list"
    },
    {
        item: "Upcoming Exam",
        icon: <MdUpcoming />,
        path: "/profile/upcoming-exam"
    },
    {
        item: "My Exams",
        icon: <VscOutput />,
        path: "/profile/my-exams"
    },

    {
        item: "Payment History",
        icon: <MdOutlinePayments />,
        path: "/profile/payment-history"
    },
    {
        item: "Your Opinions",
        icon: <MdSpeakerNotes />,
        path: "/profile/opinion"
    },
    {
        item: "Profile Settings",
        icon: <CiSettings />,
        path: "/profile/settings"
    },
]

export default ProfileItems