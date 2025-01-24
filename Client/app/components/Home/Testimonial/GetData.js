import { getDataHandler } from "@/app/actions/users/getData";
import { getAllOpinion } from "@/app/constans/constans";


export async function getOpinions() {

    const response = await getDataHandler(getAllOpinion);

    return response

}