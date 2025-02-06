import React from 'react'
import AddAbout from '../ContentForms/AddAbout'
import { getDataHandler } from '@/app/actions/users/getData'
import { aboutPageMethods } from '@/app/constans/constans'
import NoDataFound from '@/app/components/Globals/NoDataFound';
import ManageAboutPage from '../ManageComponent/ManageAboutPage';

//  dasboard , add/ Manage
export default async function AboutPage() {

    const { status, result } = await getDataHandler(aboutPageMethods);

    return (
        <div>
            <AddAbout />

            {
                !status || !result || result.length <= 0 ?
                    <NoDataFound text={"You have no about page"} />
                    :

                    <ManageAboutPage
                        aboutData={result}
                    />

            }
        </div>
    )
}
