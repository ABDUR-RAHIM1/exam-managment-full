
import { API_URL } from "@/app/constans/constans"
import adminToken from "./adminToken";

//   for Admin
export const getAllData = async (endpoint) => {
    const token = adminToken()
    const resposnse = await fetch(API_URL + endpoint, {
        cache: "no-store",
        headers: {
            "Authorization": `Bearer ${token}`
        }
    });

    const data = await resposnse.json();

    return {
        status: resposnse.status,
        result: data
    }
}