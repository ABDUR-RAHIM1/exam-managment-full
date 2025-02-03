import { getAllData } from "@/app/actions/admin/getAllData"
import { publicCourseGet } from "@/app/constans/constans"

export const getAllCourse = async () => {
    const response = await getAllData(publicCourseGet);

    return response
}