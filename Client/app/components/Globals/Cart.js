"use client";
import { postDataHandler } from "@/app/actions/users/postData";
import { purchaseCourse } from "@/app/constans/constans";
import { contextApi } from "@/app/contextApi/Context";
import React, { useContext, useState } from "react";
import { toast } from "react-toastify";

export default function Cart() {
    const { cart, setCart } = useContext(contextApi);
    const [isCartVisible, setIsCartVisible] = useState(false);
    const [totalPrice, setTotalPrice] = useState(0);
    const [loading, setLoading] = useState(false);
    const [isCheckoutVisible, setIsCheckoutVisible] = useState(false); // Checkout visibility state

    const [formData, setFormData] = useState({
        bkashNumber: "",
        transactionId: ""
    })

    const toggleCartVisibility = () => {
        setIsCartVisible(!isCartVisible);
    };


    const handleCreatePost = async () => {
        setIsCheckoutVisible(true); // Show checkout page
    };

    const handleCheckoutClose = () => {
        setIsCheckoutVisible(false); // Hide checkout page
    };

    // <===== handle bkash payment info change ======> 

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData((preData) => ({ ...preData, [name]: value }))
    }

    // <========    purchase course and pyament submit =========>

    const handlePurchaseCourseSubmit = async (e) => {
        e.preventDefault();
        if (!isCart) {
            toast.error("No Course In The Cart")
            return
        }
        try {
            setLoading(true)
            const payload = {
                courseId: cart._id,
                paymentDetails: {
                    amount: cart.offerPrice,
                    method: "Bkash",
                    bkashNumber: formData.bkashNumber,
                    transactionId: formData.transactionId,
                    status: "completed"
                }
            }



            const { status, result } = await postDataHandler(payload, "POST", purchaseCourse);

            if (status === 200 || status === 201) {
                toast.success(result.message)
                setCart(null)
            } else {
                toast.error(result.message)
            }


        } catch (error) {
            console.log(error)
            toast.error("Purchase Error")
        } finally {
            setLoading(false)
        }
    }

    const isCart = cart && Object.keys(cart).length > 0


    return (
        <div>
            {/* Show Cart Button */}
            {!isCartVisible && (
                <div
                    onClick={toggleCartVisibility}
                    className="fixed bg-yellow-700 rounded-full p-4 cursor-pointer text-white bottom-10 left-4 z-50 flex items-center gap-2 shadow-lg hover:bg-yellow-600 transition"
                >
                    <svg
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                        strokeWidth="1.5"
                        stroke="currentColor"
                        className="w-6 h-6"
                    >
                        <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            d="M3.75 4.5h16.5M4.5 8.25h15M6.75 8.25v9m10.5-9v9m-6.75-9h3m-3 9h3M8.625 18.375a.375.375 0 10.75 0 .375.375 0 00-.75 0zm6-.375a.375.375 0 10.75 0 .375.375 0 00-.75 0z"
                        />
                    </svg>
                    <span className="font-semibold text-sm">
                        View Courses ({cart ? "1" : "0"})
                    </span>
                </div>
            )}

            {/* Cart Section */}
            {isCartVisible && (
                <div
                    className={`fixed top-[150px] left-4 z-50 p-4 w-[300px] h-auto rounded-lg shadow-lg bg-blue-800`}
                >
                    <button
                        onClick={toggleCartVisibility}
                        className="absolute top-0 right-0 mt-[-10px] mr-[-10px] text-2xl bg-red-600 text-white py-2 px-4 rounded-full hover:bg-red-700 shadow-lg"
                    >
                        ×
                    </button>

                    <h2 className={`text-lg font-bold border-b pb-2 mb-4  text-white`}>
                        Cart
                    </h2>
                    <div className="flex flex-col gap-4">
                        {isCart ?
                            (
                                <div
                                    className="flex items-center justify-between bg-gray-100 p-2 rounded-md"
                                >
                                    <div className=" space-y-2">
                                        <p className="font-semibold text-gray-800">{cart.title}</p>
                                        <del className="text-sm text-red-600">
                                            Reguler Price: ৳{cart.regularPrice}
                                        </del>
                                        <p className="text-sm text-gray-600">
                                            Offer Price: ৳{cart.offerPrice}
                                        </p>
                                    </div>
                                </div>
                            ) : (
                                <p className="text-center text-yellow-400">No courses in cart.</p>
                            )}
                    </div>
                    <div className="mt-4 border-t pt-4">
                        <p className={`font-bold  text-white`}>Total: ৳{cart?.offerPrice}</p>
                        <button
                            disabled={!isCart}
                            onClick={handleCreatePost}
                            className={`w-full  py-2 mt-2 rounded-md  ${isCart ? "bg-blue-700 hover:bg-blue-600 text-white" : "bg-red-300 text-black"}`}
                        >
                            Proceed to Payment
                        </button>
                    </div>
                </div>
            )}

            {/* <================= Checkout Section ===============> */}
            {isCheckoutVisible && (
                <div className="fixed top-0 right-0 w-full h-full bg-gray-900 bg-opacity-95 flex items-center justify-center z-50">
                    <div className="bg-white w-[90%] md:w-[400px] p-6 rounded-lg shadow-lg relative">
                        <button
                            onClick={handleCheckoutClose}
                            className="absolute top-2 right-2 text-xl bg-red-600 text-white py-1 px-3 rounded-full hover:bg-red-700 shadow-md"
                        >
                            ×
                        </button>
                        <h2 className="text-lg font-bold mb-4 text-gray-800">
                            Checkout
                        </h2>
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
                                className="w-full bg-yellow-500 text-white py-2 mt-4 rounded-md hover:bg-yellow-600"
                            >
                                {
                                    loading ? "Waiting . . ." : " Confirm Payment"
                                }
                            </button>
                        </form>
                    </div>
                </div>
            )}
            {/* <================= Checkout Section End ===============> */}
        </div>
    );
}
