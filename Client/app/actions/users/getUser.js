"use server"
import { API_URL } from "@/app/constans/constans";
import userToken from "@/app/actions/users/getToken";


/// user all information in this function purchase course , blog , etc to populate all data

export const getUserHandler = async () => {
    const token = userToken();
    const apiEndpoint = "/user/me"
    if (!token) {
        console.error("No token available");
    }

    try {
        const API = `${API_URL + apiEndpoint}`;
        const response = await fetch(API, {
            method: "GET",
            headers: {
                "Authorization": `Bearer ${token}`,
                "Content-Type": "application/json",
            },
        });

        const result = await response.json();

        return { status: response.status, result };

    } catch (error) {
        console.error("Fetch Error: ", error);
        return { response: null, result: { error: "An error occurred while fetching data" } };
    }
};

