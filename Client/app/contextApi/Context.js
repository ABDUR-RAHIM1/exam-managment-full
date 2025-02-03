"use client"
import React, { createContext, useState } from 'react'
export const contextApi = createContext()

export default function Context({ children }) {

    const [noticeData, setNoticeData] = useState("");

    const [manageData, setManageData] = useState(null);
    const [cart, setCart] = useState(null)
    const [examTimeMatch, setExamTimeMatch] = useState("")


    /// dashboard 
    const [dashArrowClick, setDashArrowClick] = useState(false);
    const [accessUserInfo, setAccessUserInfo] = useState(null); // user er _id pathanor jonno jonno
    /// dashboard end

    const value = {
        noticeData, setNoticeData,
        manageData, setManageData,
        cart, setCart,
        examTimeMatch, setExamTimeMatch,

        // dashboard start
        dashArrowClick, setDashArrowClick,
        accessUserInfo, setAccessUserInfo
        // dashboard End
    }

    return (
        <contextApi.Provider value={value}>
            {children}
        </contextApi.Provider>
    )
}
