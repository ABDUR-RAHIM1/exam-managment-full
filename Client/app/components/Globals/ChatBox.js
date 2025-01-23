import React from 'react'
import { FaWhatsapp } from "react-icons/fa";
export default function ChatBox() {
    return (
        <a href='https://chat.whatsapp.com/FSMpoDwjdQX2Bu0f8L1LhG' target='_blank' className='z-[50] cursor-pointer fixed bottom-10 right-10 w-[60px] h-[60px] rounded-full bg-green-200 hover:bg-green-300 hover:shadow-xl transition-all shadow-md flex items-center justify-center'>
            <FaWhatsapp className='text-green-800 text-4xl' />
        </a>
    )
}
