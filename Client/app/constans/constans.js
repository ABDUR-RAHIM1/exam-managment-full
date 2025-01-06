
export const API_URL = "http://localhost:8500/api";
// export const API_URL = "https://tickmarkq-server.onrender.com/api";

/// <============== tokens name  =============>
// 1. userToken name ======>
export const userTokenName = "_artickmaq#User@accees/token"
export const adminTokenName = "_artickmaq#UAdmin@accees/token"


// public (no token)
const publicCourseGet = "/admin/course/all"

/// user (use token)
const resetUserPass = "/user/reset"
const getAlluser = "/user/all"
const getMyProfileInfo = "/user/me"
const purchaseCourse = "/user/course/purchase"
const purchaseCourseAll = "/user/purchase"  // admin dashboard - page -(course/purchase)
const purchaseCourseMe = "/user/course/get-purchase"
const getPaymentHsitoryWithCourse = "/user/course/get-purchase-payment"
const getMyblog = "/user/blog/me";
const putBlogStatus = "/user/blog/status/"
const deleteBlog = "/user/blogs/"
const createOpinion = "/user/opinion/create"
const getMyOpinion = "/user/opinion/view"
const getAllOpinion = "/user/opinion/view/all"
const deleteMyOpinion = "/user/opinion/delete/"
const updateMyOpinion = "/user/opinion/update/"

// admins 
const adminLogin = "/admin/auth/login"   //  admin-auth
const adminRegister = "/admin/auth/register"   //  admin-auth
const adminCreateCourse = "/admin/course/create"  //admin/course/add (page)
const adminUpdateCourse = "/admin/course/update/"
const courseDelete = "/admin/course/delete/"
const questionAdd = "/admin/question/add"
const questionGetAll = "/admin/question/all"
const freeQuestionGetAll = "/admin/question/free/all"

const questionDetailsById = "/admin/question/details/"
const questionDelete = "/admin/question/delete/"
const getAdminModaretorBlogs = "/user/blog/admin/me"

// result / questions
const getResultAll = "/results/get/all"
const getResultMe = "/results/get/me"
const getResultById = "/results/get/"


export {
    // public start
    publicCourseGet,
    // public end

    // user start 
    resetUserPass,
    getAlluser,
    getMyProfileInfo, purchaseCourse, purchaseCourseAll, purchaseCourseMe, getPaymentHsitoryWithCourse, getMyblog, putBlogStatus, deleteBlog,
    createOpinion, getMyOpinion, getAllOpinion, deleteMyOpinion, updateMyOpinion,
    // user end 


    adminLogin,
    adminRegister,
    adminCreateCourse,
    adminUpdateCourse,
    courseDelete,
    questionAdd,
    questionGetAll,
    freeQuestionGetAll,
    questionDetailsById,
    questionDelete,
    getAdminModaretorBlogs,

    /// results / questions
    getResultAll, getResultMe, getResultById

}
