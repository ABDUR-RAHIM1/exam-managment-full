
import { getAdminModaretorBlogs } from '@/app/constans/constans'
import React from 'react'
import BlogTable from '../public/BlogTable'
import NoDataFound from '@/app/components/Globals/NoDataFound'
import { getAllData } from '@/app/actions/admin/getAllData'

export default async function AdminBlog() {
    const { status, result } = await getAllData(getAdminModaretorBlogs)

    if (status !== 200) {
        return <NoDataFound />
    }
    return (
        <div>
            <BlogTable blogs={result} />
        </div>
    )
}
