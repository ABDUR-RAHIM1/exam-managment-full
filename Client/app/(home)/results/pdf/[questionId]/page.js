import { getDataById } from '@/app/actions/globals/getDataById';
import { getResultById } from '@/app/constans/constans';
import React from 'react'
import Results from '../Results'; 
import NoDataFound from '@/app/components/Globals/NoDataFound';

export default async function PdfViwer({ params }) {
    const { questionId } = params
    const getDetailsApiEndpoint = `${getResultById + questionId}`
    const { status, result } = await getDataById(getDetailsApiEndpoint);

    if (status !== 200 || !result) {
        return <NoDataFound />
    }
    return (
        <div>
            <Results result={result} />
        </div>
    )
}
