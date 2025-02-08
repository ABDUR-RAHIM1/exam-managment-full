import { getAllData } from '@/app/actions/admin/getAllData'
import NoDataFound from '@/app/components/Globals/NoDataFound';
import { seoPostUpdate } from '@/app/constans/constans'
import React from 'react'

export default async function ViewSeo() {

    const { status, result } = await getAllData(seoPostUpdate);

    if (!status || !result) {
        return <NoDataFound />
    }

    return (
        <div className='my-5 py-10'>
            <div className='shadow-xl bg-white px-3 md:px-5 py-2'>
                <h4 className='font-bold text-lg my-3'>Seo Title</h4>
                <p>{result.title}</p>
            </div>

            <div className='shadow-xl bg-white px-3 md:px-5 py-2'>
                <h4 className='font-bold text-lg my-3'>Seo Description</h4>
                <p>{result.description}</p>
            </div>

            <div className='shadow-xl bg-white px-3 md:px-5 py-2'>
                <h4 className='font-bold text-lg my-3'>Seo Keywords</h4>
                <div className="flex flex-wrap gap-2">
                    {result.keywords.map((k, i) => (
                        <span key={i} className='bg-gray-200 text-gray-700 px-2 py-1 rounded-lg'>
                            #{k}
                        </span>
                    ))}
                </div>
            </div>
        </div>

    )
}
