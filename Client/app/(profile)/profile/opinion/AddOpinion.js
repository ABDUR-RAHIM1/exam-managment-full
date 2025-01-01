"use client";
import { postDataHandler } from '@/app/actions/users/postData';
import { createOpinion, updateMyOpinion } from '@/app/constans/constans';
import { contextApi } from '@/app/contextApi/Context';
import { useRouter } from 'next/navigation';
import React, { useContext, useEffect, useState } from 'react';
import { toast } from 'react-toastify';

export default function AddOpinion() {
    const { manageData } = useContext(contextApi)
    const router = useRouter();
    const [loading, setLoading] = useState(false)
    const [formData, setFormData] = useState({
        opinion: ""
    });

    // <====== Handle input change ========>
    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData({
            ...formData,
            [name]: value
        });
    };

    // <============= Handle form submit (post and update) ===============>
    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            setLoading(true);

            let status;
            let result;

            if (isEdit) {
                const updateEndpoint = updateMyOpinion + formData._id;
                ({ status, result } = await postDataHandler(formData, "PUT", updateEndpoint));
            } else {
                ({ status, result } = await postDataHandler(formData, "POST", createOpinion));
            }

            if (status === 200 || status === 201) {
                toast.success(result.message);
                router.refresh();
            } else {
                toast.error(result.message);
            }
        } catch (error) {
            console.log(error)
            toast.error("Failed!");
        } finally {
            setLoading(false);
        }
    };



    //  <========= Check Editable Data is Avilable or not ===========>
    const isEdit = manageData && Object.keys(manageData).length > 0

    // <============== Editable Data set In FormData State ===================>
    useEffect(() => {
        if (isEdit) {
            setFormData(manageData)
        }
    }, [manageData])


    return (
        <div className="container">
            <h2>
                {
                    isEdit ? "Edit Your Opinion" : "Add Your Opinion"
                }
            </h2>
            <form onSubmit={handleSubmit}>
                <div className="my-4">
                    <textarea
                        id="opinion"
                        name="opinion"
                        value={formData.opinion}
                        onChange={handleInputChange}
                        placeholder="Write your opinion here..."
                        rows="5"
                        required
                        className='input'
                    />
                </div>
                <button type="submit" className={`${loading ? "bg-yellow-600" : "bg-blue-600"}  w-full py-4 px-5  text-white rounded-md my-4 text-xl font-medium`}>
                    {
                        loading ? "Loading..." : isEdit ? "Update" : "Submit"
                    }
                </button>
            </form>
        </div>
    );
}
