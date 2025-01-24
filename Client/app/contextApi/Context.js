"use client"
import React, { createContext, useState } from 'react'
export const contextApi = createContext()

export default function Context({ children }) {

    const [noticeData, setNoticeData] = useState("");
    const [showModal, setShowModal] = useState(false)

    const [manageData, setManageData] = useState(null);
    const [cart, setCart] = useState(null)
    const [examTimeMatch, setExamTimeMatch] = useState("")


    /// dashboard 
    const [dashArrowClick, setDashArrowClick] = useState(false)
    /// dashboard end

    const value = {
        showModal, setShowModal,
        noticeData, setNoticeData,
        manageData, setManageData,
        cart, setCart,
        examTimeMatch, setExamTimeMatch,

        // dashboard start
        dashArrowClick, setDashArrowClick
        // dashboard End
    }

    return (
        <contextApi.Provider value={value}>
            {children}
        </contextApi.Provider>
    )
}
