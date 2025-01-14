import React from 'react'
import ManageSliders from '../ManageComponent/ManageSliders'
import { getPublicSliders } from '@/app/constans/constans';
import { getDataHandler } from '@/app/actions/users/getData';

export default async function ManageContents() {
    // const { status, result } = await getDataHandler(getPublicSliders);

    const [sliders] = await Promise.all([
        getDataHandler(getPublicSliders)
    ])

    return (
        <div className='px-3'>
            <ManageSliders sliders={sliders} />
        </div>
    )
}
