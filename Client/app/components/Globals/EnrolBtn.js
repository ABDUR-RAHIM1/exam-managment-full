"use client";
import React, { useEffect, useState } from 'react'
import { toast } from 'react-toastify';
import { API_URL } from '@/app/constans/constans'
import Cookies from 'js-cookie';
import Alert from '@/app/helpers/Alert';
import Spinner from '@/app/helpers/Spinner';

export default function EnrolBtn({ courseData }) {
    const userToken = Cookies.get("userToken")
    const [showAlert, setShowAlert] = useState(false)
    const [isLoading, setIsLoading] = useState(false)

    const handlePaymentAndPurchase = async () => {
        const payload = {
            courseId: courseData._id,
            amount: courseData.offerPrice,
        };

        if (!userToken) {
            setShowAlert(true);
            return
        }


        try {
            setIsLoading(true)
            const res = await fetch(API_URL + "/bkash/payment/create", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    "Authorization": `Bearer ${userToken}`
                },
                body: JSON.stringify(payload)
            });

            const data = await res.json();

            if (data.success && data.bkashURL) {
                window.location.href = data.bkashURL;  // ✅ bKash payment page-এ redirect করবে
            } else {
                console.log("Payment Failed: ", data.error);
                toast.error(data.message)
            }

        } catch (error) {
            toast.error("Payment Failed!")
            console.log(error)
        } finally {
            setIsLoading(false)
        }

    }


    useEffect(() => {
        const token = Cookies.get("userToken");
        if (!token) {
            setShowAlert(true);
        }
    }, []);

    const handleCloseAlert = () => {
        setShowAlert(false)
    }


    return (
        <>

            {showAlert && <Alert handleCloseAlert={handleCloseAlert} />}

            <button
                onClick={() => handlePaymentAndPurchase(courseData)}
                className="w-full bg-blue-600 text-white py-2 h-[50px] font-bold tracking-wider rounded-lg hover:bg-blue-700"
            >
                {
                    isLoading ? <Spinner /> : " Enroll Now"
                }
            </button>
        </>
    );
}


