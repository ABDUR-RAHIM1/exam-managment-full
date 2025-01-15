import React from 'react'
import AddSlider from '../ContentForms/AddSlider'
import ManageSliders from '../ManageComponent/ManageSliders'
import { getDataHandler } from '@/app/actions/users/getData'
import { getPublicSliders } from '@/app/constans/constans'
import NoDataFound from '@/app/components/Globals/NoDataFound'

export default async function Sliders() {
    const { status, result } = await getDataHandler(getPublicSliders);

    return (
        <div>
            <AddSlider />
            {
                (status !== 200 || !result) ? <NoDataFound /> :
                    <ManageSliders sliders={result} />
            }
        </div>
    )
}
