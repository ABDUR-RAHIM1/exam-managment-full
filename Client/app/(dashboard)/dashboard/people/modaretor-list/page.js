import { getAllData } from '@/app/actions/admin/getAllData'
import NoDataFound from '@/app/components/Globals/NoDataFound';
import { getAllAdminModaretors } from '@/app/constans/constans'
import React from 'react'
import ModaretorListTable from './ModaretorListTable';

export default async function ModaretorList() {

    const { status, result } = await getAllData(getAllAdminModaretors);

    if (!status || !result) {
        return <NoDataFound />
    }

    return (
        <div className=' py-10'>
            <ModaretorListTable
                data={result}
            />
        </div>
    )
}
