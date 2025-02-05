import React from 'react'
import { getDataHandler } from '@/app/actions/users/getData'
import { getHeadline } from '@/app/constans/constans'
import NoDataFound from '@/app/components/Globals/NoDataFound'
import AddHeadline from '../ContentForms/AddHeadline'
import Headline from '../ManageComponent/Headline'

export default async function Headlines() {
    const { status, result } = await getDataHandler();

    if (status !== 200 || !result) {
        return <NoDataFound />
    }
    return (
        <div>
            <AddHeadline />
            <Headline headline={result} />
        </div>
    )
}
