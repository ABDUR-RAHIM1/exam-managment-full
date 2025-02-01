import React from 'react'
import { FaWhatsapp } from "react-icons/fa";
export default function ChatBox() {
    return (
        <a href='https://api.whatsapp.com/message/MMHC65DIA532N1?autoload=1&app_absent=0' target='_blank' className='z-[50] cursor-pointer fixed bottom-3 right-2 w-[60px] h-[60px] rounded-full bg-green-200 hover:bg-green-300 hover:shadow-xl transition-all shadow-md flex items-center justify-center'>
            <FaWhatsapp className='text-green-800 text-4xl' />
        </a>
    )
}
