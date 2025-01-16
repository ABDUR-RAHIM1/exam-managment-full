import React from 'react'
import AddCourseInfo from '../ContentForms/AddCourseInfo'
import ManageCourseInfo from '../ManageComponent/ManageCourseInfo'
import { getDataHandler } from '@/app/actions/users/getData'
import { getCourseInfo } from '@/app/constans/constans'
import NoDataFound from '@/app/components/Globals/NoDataFound'

export default async function CourseInfo() {
    const { status, result } = await getDataHandler(getCourseInfo);

    return (
        <div>
            <AddCourseInfo />

            {
                (status !== 200 || !result) ? <NoDataFound /> :
                    <ManageCourseInfo info={result} />
            }
        </div>
    )
}
