import React from 'react'
import AddLinks from '../ContentForms/AddLinks'
import ManageLinks from '../ManageComponent/ManageLinks'
import { getResourse } from '@/app/constans/constans'
import NoDataFound from '@/app/components/Globals/NoDataFound'
import { getAllData } from '@/app/actions/admin/getAllData'

export default async function FreeResourseLinks() {
    const { status, result } = await getAllData(getResourse);

    return (
        <div>
            <AddLinks page={"freeResourse"} />
            {
                (status !== 200 || !result) ?
                    <NoDataFound />
                    :
                    <ManageLinks links={result} page={"freeResourse"} />
            }
        </div>
    )
}
