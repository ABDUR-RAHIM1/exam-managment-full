import { getDataHandler } from "@/app/actions/users/getData"
import { getPublicSliders } from "@/app/constans/constans"

export const getSliders = async () => {
    const res = await getDataHandler(getPublicSliders);

    return res
}