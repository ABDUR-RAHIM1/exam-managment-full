"use client"
import Link from 'next/link'
import { useToken } from '@/app/hooks/useToken';
import React, { useEffect, useState } from 'react'

export default function AccountBtn() {
    const [accountLink, setAccountLink] = useState({ item: "Login", path: "/auth" });

    const token = useToken();
    useEffect(() => {
        if (token) {
            setAccountLink({
                item: "My account",
                path: "/profile"
            })
        }
    }, [token]);
    return (
        <Link href={accountLink.path} className=" bg-blue-200 rounded-sm hover:bg-blue-300 font-bold text-blue-500 px-4 py-2">{
            accountLink.item
        }</Link>
    )
}
