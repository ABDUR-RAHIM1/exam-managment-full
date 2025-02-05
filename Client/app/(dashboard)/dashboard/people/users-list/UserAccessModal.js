import { postDataHandler } from '@/app/actions/admin/postData';
import { giveAccessCourse } from '@/app/constans/constans';
import { contextApi } from '@/app/contextApi/Context';
import Spinner from '@/app/helpers/Spinner';
import React, { useContext, useEffect, useState } from 'react';
import { MdClose } from 'react-icons/md';
import { toast } from 'react-toastify';
import { getAllCourse } from './GetAllCourse';
import { useRouter } from 'next/navigation';

export default function UserAccessModal({ handleCloseModal }) {
    const router = useRouter()
    const { accessUserInfo } = useContext(contextApi);
    const [postLoading, setPostLoading] = useState(false)
    const [courseList, setCouseList] = useState([]);

    const [formData, setFormData] = useState({ paymentStatus: "", accessCourse: "" });


    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value })
    }

    // get all course and set Select Field 
    useEffect(() => {
        const fetchData = async () => {
            const { status, result } = await getAllCourse();
            if (status === 200) {
                setCouseList(result)
            }
        };

        fetchData();
    }, []);

    console.log(formData)
    //  auto fill FormData from UserOld info
    useEffect(() => {
        if (Object.keys(accessUserInfo).length > 0) {
            setFormData({
                ...formData,
                paymentStatus: accessUserInfo.paymentStatus,
                accessCourse: accessUserInfo.accessCourse
            })
        }
    }, [accessUserInfo])

    const handleSubmit = async (e) => {
        e.preventDefault();
        setPostLoading(true)
        try {
            const userPutApi = giveAccessCourse + accessUserInfo._id
            const { status, result } = await postDataHandler(formData, "PUT", userPutApi);

            if (status === 201 || status === 200) {
                toast.success(result.message);
                router.refresh();
            } else {
                toast.error(result.message)
            }


        } catch (error) {
            toast.error("Failed To Update")
        } finally {
            setPostLoading(false)
        }
    }

    return (
        <div className="px-4 fixed top-0 right-0 left-0 bottom-0 flex items-center justify-center bg-black bg-opacity-90 z-50">
            <div className=" bg-white dark:bg-gray-700 rounded-lg shadow-lg w-full md:w-[50%] p-4 md:p-5">

                <div className=' flex items-center justify-between my-5'>
                    <h3 className=' text-blue-500'>Give access to the course</h3>
                    <MdClose onClick={handleCloseModal} className=' text-3xl text-red-500 cursor-pointer' />
                </div>
                <form
                    onSubmit={handleSubmit}
                    className="space-y-4">
                    <div className=' my-2'>

                        <select onChange={handleChange} value={formData.paymentStatus} name="paymentStatus" id="paymentStatus" className='input'>
                            <option value="">Select Payment Status</option>
                            <option value="true">Paid</option>
                            <option value="false">Unpaid</option>
                        </select>

                    </div>
                    <div className=' my-2'>

                        <select onChange={handleChange} value={formData.accessCourse} name="accessCourse" id="accessCourse" className='input'>
                            <option value="">Select a Course</option>
                            {
                                courseList && courseList.map((course) => (
                                    <option key={course._id} value={course._id}>
                                        {course.title}
                                    </option>
                                ))
                            }
                        </select>

                    </div>
                    <div className="text-sm font-medium my-4 text-gray-500 dark:text-gray-300">
                        <button type='submit' className=' w-full py-2 bg-blue-600 text-white rounded-sm font-semibold'>
                            {
                                postLoading ? <Spinner /> : " Give Access"
                            }
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
}
