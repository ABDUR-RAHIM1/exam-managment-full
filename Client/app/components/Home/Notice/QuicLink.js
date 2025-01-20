import { getDataHandler } from '@/app/actions/users/getData';
import { getLinks } from '@/app/constans/constans';
import React from 'react'
import NoDataFound from '../../Globals/NoDataFound';

export default async function QuicLink() {
    const { status, result } = await getDataHandler(getLinks);

    if (status !== 200 || !result) {
        return <NoDataFound />
    }
    return (
        <div>

            <h3 className=' text-xl md:text-2xl font-semibold my-3 text-blue-500'>Quick Links</h3>

            {
                result && result.length <= 0
                    ?
                    <p className=' my-3 to-red-500'> No Links Is Here</p>

                    :
                    result.map((r, i) => (
                        <a key={r._id} href={r.link} target='_blank' className=' flex items-center gap-2 my-3 hover:underline transition-all'>
                            <span>{i + 1}</span>
                            <span>{r.title}</span>
                        </a>
                    ))
            }

            {/* Google Ad Placeholder */}
            <div className="google-ad w-full h-40 bg-gray-200 flex items-center justify-center rounded-lg">
                <span className="text-gray-600">Google Ad Placeholder</span>
            </div>
        </div >
    )
}
