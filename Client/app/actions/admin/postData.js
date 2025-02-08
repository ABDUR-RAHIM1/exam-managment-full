
import { API_URL } from "@/app/constans/constans";
import Cookies from "js-cookie";

export const postDataHandler = async (formData, method, endpoint) => {
 console.log(formData)
 console.log(method)
 console.log(endpoint)
    const token = Cookies.get("adminToken")
    try {
        const response = await fetch(API_URL + endpoint, {
            method: method,
            headers: {
                "Content-type": "application/json",
                "Authorization": `Bearer ${token}`
            },
            body: JSON.stringify(formData)
        });
        const result = await response.json();
        console.log(result)
        return { result, status: response.status }

    } catch (error) {
        console.log(error)
    }
}