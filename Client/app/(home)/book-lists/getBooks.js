import { getDataHandler } from "@/app/actions/users/getData"
import { bookMethodsAll } from "@/app/constans/constans"

export const getBooks = async()=>{
    const response =  await getDataHandler(bookMethodsAll);

    return response;
}