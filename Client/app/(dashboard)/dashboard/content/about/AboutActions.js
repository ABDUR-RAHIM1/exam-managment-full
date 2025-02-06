import { aboutPageMethods } from '@/app/constans/constans'
import DeleteAction from '@/app/helpers/Actions/admin/DeleteAction' 
import React from 'react'

export default function AboutActions({ aboutData }) {
    return (
        <div className=' my-4 w-full py-5 px-3 rounded-md bg-gray-300'>
            <div className=' flex items-center gap-5'>
                {/* <EditAction /> */}
                <DeleteAction route={aboutPageMethods + aboutData._id} />
            </div>
        </div>
    )
}
