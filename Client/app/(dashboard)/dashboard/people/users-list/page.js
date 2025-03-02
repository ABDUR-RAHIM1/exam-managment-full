import { getDataHandler } from '@/app/actions/users/getData'
import NoDataFound from '@/app/components/Globals/NoDataFound'
import React from 'react'
import UserTable from './UserTable'
import { getAlluser } from '@/app/constans/constans'

export default async function UsersList() {
    const { status, result } = await getDataHandler(getAlluser)

    if (status !== 200) {
        return <NoDataFound />
    }
 

    return (
        <div className=' bg-gray-100 rounded-md py-10 px-4'>
            <UserTable data={result} />
        </div>
    )
}
