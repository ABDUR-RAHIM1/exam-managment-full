"use client"
import { useRouter } from 'next/navigation'
import React, { useContext } from 'react' 
import { contextApi } from '@/app/contextApi/Context';
import EditBtn from '../../EditBtn';

export default function EditAction({ data, path }) {
    const router = useRouter();
    const { setManageData } = useContext(contextApi);

    const handleUpdateAction = () => {
        const navigatePath = path; 
        setManageData(data)
        router.push(navigatePath)
    }

    return (
        <button onClick={handleUpdateAction} >
            <EditBtn />
        </button>
    )
}
