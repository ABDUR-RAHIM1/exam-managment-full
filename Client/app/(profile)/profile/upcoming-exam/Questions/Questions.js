import { getDataById } from '@/app/actions/globals/getDataById'
import {  getMyquestion } from '@/app/constans/constans';
import React from 'react'
import QuestionTable from './QuestionTable';
import NoDataFound from '@/app/components/Globals/NoDataFound';

export default async function Questions({ courseId }) {

    const api = getMyquestion + courseId
    const { status, result } = await getDataById(api);

    if (!status || !result) return <NoDataFound/>

    return <QuestionTable questions={result} />
}
