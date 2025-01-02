import { getDataHandler } from '@/app/actions/users/getData'
import { getAllOpinion } from '@/app/constans/constans'
import React from 'react'
import TestiTable from './TestiTable'

export default async function Testimonials() {
  const { result } = await getDataHandler(getAllOpinion)
  return (
    <div>
      <TestiTable tableData={result} />
    </div>
  )
}
