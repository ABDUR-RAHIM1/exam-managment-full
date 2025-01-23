import { CiViewBoard, CiBoxList, CiSettings } from "react-icons/ci";
import { MdUpcoming, MdOutlinePayments, MdSpeakerNotes } from "react-icons/md";
import { VscOutput } from "react-icons/vsc";

const ProfileItems = [
    {
        item: "প্রোফাইল",
        icon: <CiViewBoard />,
        path: "/profile"
    },
    {
        item: "কোর্স তালিকা",
        icon: <CiBoxList />,
        path: "/profile/course-list"
    },
    {
        item: "পরীক্ষা সমূহ ",
        icon: <MdUpcoming />,
        path: "/profile/upcoming-exam"
    },
    {
        item: "ফলাফল",
        icon: <VscOutput />,
        path: "/profile/my-exams"
    },
    {
        item: "পেমেন্ট ইতিহাস",
        icon: <MdOutlinePayments />,
        path: "/profile/payment-history"
    },
    {
        item: "মতামত দিন",
        icon: <MdSpeakerNotes />,
        path: "/profile/opinion"
    },
    {
        item: "সেটিংস",
        icon: <CiSettings />,
        path: "/profile/settings"
    },
];

export default ProfileItems;
