"use client";
import { contextApi } from '@/app/contextApi/Context'
import React, { useContext } from 'react'

export default function EnrolBtn({ courseData }) {
    const { setCart } = useContext(contextApi);

    const handleClick = () => {
        const course = {
            _id: courseData._id,
            regularPrice: courseData.regularPrice,
            offerPrice: courseData.offerPrice,
            category: courseData.category,
            title: courseData.title
        };
        setCart(course)
    }

    return (
        <button
            onClick={() => handleClick(courseData)}
            className="w-full bg-blue-600 text-white py-2 font-bold tracking-wider rounded-lg hover:bg-blue-700"
        >
            Enroll Now
        </button>
    );
}




// const handleClick = (data) => {
//     // If the course is not already in the cart, replace the old one with the new course
//     const isAlreadyInCart = cart.some(item => item._id === data._id);

//     if (!isAlreadyInCart) {
//         // Only add this course, removing any existing course
//         setCart([data]);
//         toast.success(`${data.title} has been added to your cart.`);
//     } else {
//         toast.warning("Course is already in the cart.");
//     }
// };
