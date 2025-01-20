import { getDataHandler } from '@/app/actions/users/getData'
import React from 'react'

export default async function Test() {
    const { status, result } = await getDataHandler()
    return (
        <div className='p-20'>Test</div>
    )
}
