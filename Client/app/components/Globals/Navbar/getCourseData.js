const { getDataHandler } = require("@/app/actions/users/getData")
const { publicCourseGet } = require("@/app/constans/constans")


const getCourseData = async () => {

    const { status, result } = await getDataHandler(publicCourseGet)

    return { status, result }

};

export default getCourseData