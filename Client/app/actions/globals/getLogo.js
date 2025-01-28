import { getDataHandler } from '@/app/actions/users/getData'
import { getLogo } from '@/app/constans/constans'

 export const getLogoData = async () => {
    const logo = await getDataHandler(getLogo);
    return logo
}