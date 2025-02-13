import {  getAllDataWithoutToken } from "@/app/actions/admin/getAllData"
import { publicCourseGet } from "@/app/constans/constans"

export const getAllCourse = async () => {
    const response = await getAllDataWithoutToken(publicCourseGet);

    return response
}