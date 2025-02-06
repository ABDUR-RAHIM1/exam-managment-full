import React from 'react'
import AddBook from '../ContentForms/AddBook'
import ManageBooks from '../ManageComponent/ManageBooks'
import { bookMethodsAll } from '@/app/constans/constans';
import { getDataHandler } from '@/app/actions/users/getData';
import NoDataFound from '@/app/components/Globals/NoDataFound';

export default async function Books() {
    const { status, result } = await getDataHandler(bookMethodsAll);

    if (status !== 200 || !result) {
        return <NoDataFound />
    }
    return (
        <div>
            <AddBook />


            {
                !status || !result ? <NoDataFound />
                    :
                    <ManageBooks booksData={result} />
            }
        </div>
    )
}
