import { API_URL } from "@/app/constans/constans"

//   for Admin
export const getAllData = async (endpoint) => {
    const resposnse = await fetch(API_URL + endpoint, {
        next: { revalidate: 10000 }
    });

    const data = await resposnse.json();

    return {
        status: resposnse.status,
        data: data
    }
}