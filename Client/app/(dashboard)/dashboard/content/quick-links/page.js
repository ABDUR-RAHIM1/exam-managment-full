import React from 'react'
import AddLinks from '../ContentForms/AddLinks'
import ManageLinks from '../ManageComponent/ManageLinks'
import { getDataHandler } from '@/app/actions/users/getData'
import { getLinks } from '@/app/constans/constans'
import NoDataFound from '@/app/components/Globals/NoDataFound'

export default async function QuickLinks() {
    const { status, result } = await getDataHandler(getLinks);

    return (
        <div>
            <AddLinks />
            {
                (status !== 200 || !result) ?
                    <NoDataFound />
                    :
                    <ManageLinks links={result} />
            }
        </div>
    )
}
