import React from 'react'
import AddOpinion from './AddOpinion'
import ViewOpinions from './ViewOpinions'
import { getDataHandler } from '@/app/actions/users/getData'
import { getMyOpinion } from '@/app/constans/constans'
import NoDataFound from '@/app/components/Globals/NoDataFound'

//  <========= opinions add and get for users ==========>
export default async function Opinion() {

    const { status, result } = await getDataHandler(getMyOpinion);

    if (status !== 200 || !result) {
        return <NoDataFound />
    }

    return (
        <div className=' w-full my-10 px-3'>
            <AddOpinion />

            <div className=' my-10 flex justify-between flex-wrap'>
                <ViewOpinions opinionData={result} />
            </div>
        </div>
    )
}
