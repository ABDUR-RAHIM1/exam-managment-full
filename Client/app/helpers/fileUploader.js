
import { useState } from "react";
import { IMGBB_API } from "../constans/constans";

export default function useFileUploader() {
    const [imgUrl, setImgUrl] = useState("");
    const [uploadResponse, setUploadResponse] = useState({
        message: "",
        status: 0,
    });

    const uploader = async (file) => {
        if (!file) {
            setUploadResponse({
                message: "No file selected",
                status: 400,
            });
            return;
        }

        const form = new FormData();
        form.append("image", file);

        try {
            setUploadResponse({
                message: "Uploading...",
                status: 102,
            });

            const response = await fetch(`https://api.imgbb.com/1/upload?key=${IMGBB_API}`, {
                method: "POST",
                // mode: 'no-cors',
                body: form,
            });

            if (!response.ok) {
                throw new Error("Failed to upload");
            }

            const data = await response.json();
            const uploadedUrl = data.data.url;

            setImgUrl(uploadedUrl);
            setUploadResponse({
                message: "uploaded successfully",
                status: 200,
            });
        } catch (error) {
            console.error("Error uploading:", error);
            setUploadResponse({
                message: "Failed to upload",
                status: 500,
            });
        }
    };

    return { uploader, uploadResponse, imgUrl };
}


