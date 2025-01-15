import React from 'react'
import AddNotice from '../ContentForms/AddNotice'
import ManageNotice from '../ManageComponent/ManageNotice'
import { getDataHandler } from '@/app/actions/users/getData';
import { getNotice } from '@/app/constans/constans';
import NoDataFound from '@/app/components/Globals/NoDataFound';

export default async function NoticeBoard() {

    const { status, result } = await getDataHandler(getNotice);

    return (
        <div>
            <AddNotice />

            {
                (status !== 200 || !result) ? <NoDataFound /> :
                    <ManageNotice notices={result} />
            }

        </div>
    )
}
