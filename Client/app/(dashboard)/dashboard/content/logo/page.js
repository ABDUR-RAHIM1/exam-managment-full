import React from 'react'
import AddLogo from '../ContentForms/AddLogo'
import { getAllData } from '@/app/actions/admin/getAllData';
import { getLogo } from '@/app/constans/constans';
import NoDataFound from '@/app/components/Globals/NoDataFound';
import ManageLogo from '../ManageComponent/ManageLogo';

export default async function Logo() {
    const { status, result } = await getAllData(getLogo);
  
    return (
        <div>
            <AddLogo />

            {
                !status || !result ? <NoDataFound />
                    :
                    <ManageLogo logoData={result} />
            }

        </div>
    )
}
