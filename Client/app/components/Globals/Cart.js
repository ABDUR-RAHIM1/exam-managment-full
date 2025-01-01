"use client";
import { postDataHandler } from "@/app/actions/users/postData";
import { purchaseCourse } from "@/app/constans/constans";
import { contextApi } from "@/app/contextApi/Context";
import React, { useContext, useState, useEffect } from "react";
import { MdClose } from "react-icons/md";
import { toast } from "react-toastify";

export default function Cart() {
    const { cart, setCart } = useContext(contextApi);
    const [loading, setLoading] = useState(false);
    const [showCheckout, setShowCheckout] = useState(false);

    const [formData, setFormData] = useState({
        bkashNumber: "",
        transactionId: ""
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData((preData) => ({ ...preData, [name]: value }));
    };

    const handlePurchaseCourseSubmit = async (e) => {
        e.preventDefault();
        if (!cart) {
            toast.error("No Course In The Cart");
            return;
        }
        try {
            setLoading(true);
            const payload = {
                courseId: cart._id,
                paymentDetails: {
                    amount: cart.offerPrice,
                    method: "Bkash",
                    bkashNumber: formData.bkashNumber,
                    transactionId: formData.transactionId,
                    status: "completed"
                }
            };

            const { status, result } = await postDataHandler(payload, "POST", purchaseCourse);

            if (status === 200 || status === 201) {
                toast.success(result.message);
                setCart(null);
                setShowCheckout(false); // Hide checkout after purchase
            } else {
                toast.error(result.message);
            }
        } catch (error) {
            console.log(error);
            toast.error("Purchase Error");
        } finally {
            setLoading(false);
        }
    };

    const handleCloseCheckout = () => {
        setCart(null); // Clear cart
        setShowCheckout(false); // Hide checkout
    };

    const isCart = cart && Object.keys(cart).length > 0;

    // Automatically show checkout when course is added
    useEffect(() => {
        if (isCart) {
            setShowCheckout(true);
        }
    }, [cart]);

    return (
        <div>
            {/* Checkout Section */}
            {showCheckout && isCart && (
                <div className="fixed top-0 right-0 w-full h-full bg-gray-900 bg-opacity-95 flex items-center justify-center z-50">
                    <div className="bg-white w-[90%] md:w-[400px] p-6 rounded-lg shadow-lg relative">
                        {/* Close Button */}
                        <button
                            onClick={handleCloseCheckout}
                            className="absolute top-2 right-2 text-white bg-red-600 rounded-full p-2 text-2xl hover:bg-red-700"
                        >
                            <MdClose />
                        </button>

                        <h2 className="text-lg font-bold mb-4 text-gray-800">Checkout</h2>
                        <p className="mb-4 text-gray-600">
                            Total Amount: ৳{cart?.offerPrice}
                        </p>
                        <form onSubmit={handlePurchaseCourseSubmit}>
                            <label className="block mb-2 text-sm font-medium text-gray-700">
                                Bkash Number:
                                <input
                                    type="number"
                                    name="bkashNumber"
                                    placeholder="Enter your Bkash number"
                                    required
                                    value={formData.bkashNumber}
                                    onChange={handleChange}
                                    className="block w-full mt-1 border rounded-md p-2 focus:outline-none focus:ring focus:ring-yellow-500"
                                />
                            </label>
                            <label className="block mb-2 text-sm font-medium text-gray-700">
                                Transaction ID:
                                <input
                                    type="text"
                                    name="transactionId"
                                    placeholder="Enter your transaction ID"
                                    required
                                    value={formData.transactionId}
                                    onChange={handleChange}
                                    className="block w-full mt-1 border rounded-md p-2 focus:outline-none focus:ring focus:ring-yellow-500"
                                />
                            </label>
                            <button
                                disabled={loading}
                                type="submit"
                                className="bg-blue-500 text-white w-full py-2 mt-4 rounded-md hover:bg-blue-600"
                            >
                                {loading ? "Processing..." : "Confirm Payment"}
                            </button>
                        </form>
                    </div>
                </div>
            )}
        </div>
    );
}
