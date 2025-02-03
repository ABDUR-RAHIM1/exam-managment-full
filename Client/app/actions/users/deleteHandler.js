
import Cookies from "js-cookie";
const { API_URL } = require("@/app/constans/constans")

export const deleteHandler = async (endpoint) => {
    const token = Cookies.get("userToken");

    try {
        const res = await fetch(API_URL + endpoint, {
            method: "DELETE",
            headers: {
                "Authorization": `Bearer ${token}`
            }
        });

        const result = await res.json();

        return { status: res.status, result }

    } catch (error) {
        console.log(error)
    }
}