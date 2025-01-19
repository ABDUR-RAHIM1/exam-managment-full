import { getDataHandler } from '@/app/actions/users/getData';
import { getWhy } from '@/app/constans/constans';
import React from 'react'
import AddWhy from '../ContentForms/AddWhy';
import ManageWhy from '../ManageComponent/ManageWhy';
import NoDataFound from '@/app/components/Globals/NoDataFound';

export default async function WhyChoose() {
    const { status, result } = await getDataHandler(getWhy);

    return (
        <div>
            <AddWhy />
            {
                (status !== 200 || !result) ? <NoDataFound /> :
                    <ManageWhy whyInfo={result} />
            }
        </div>
    )
}
