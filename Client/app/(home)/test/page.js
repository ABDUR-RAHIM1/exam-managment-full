
import { getDataById } from '@/app/actions/globals/getDataById';
import React from 'react'

export default async function TestPage() {
    // http://localhost:8500/api/admin/course/676c106f21aae5bfaea5d4bc
    const { status, result } = await getDataById("/admin/course/676c106f21aae5bfaea5d4bc");
    console.log(status, result)

    const { title, category, questions } = result;

    return (
        <div className='p-20 min-h-screen'>
            <div className=' border my-3'>
                <h2>Title : {title}</h2>
                <p>Categorie : {category}</p>
            </div>
            <div>
                {
                    questions && questions.map(q => (
                        <div>
                              <li> questionTitle : {q.questionTitle}</li>
                              <li> questionTitle : {q.questionTitle}</li>
                              <li> Exam Time : {q.examTime}</li>
                        </div>
                    ))
                }
            </div>
        </div>
    )
}
