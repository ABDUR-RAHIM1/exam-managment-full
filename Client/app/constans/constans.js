
// export const API_URL = "http://localhost:8500/api";
export const API_URL = "https://tickmarkq-server.onrender.com/api";

/// <============== tokens name  =============>
// 1. userToken name ======>
export const userTokenName = "_artickmaq#User@accees/token"
export const adminTokenName = "_artickmaq#UAdmin@accees/token"
export const adminRole = "_artickmaq#UAdmin@R-o_le"


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
const getCourseById = "/admin/course/"
const adminUpdateCourse = "/admin/course/update/"
const courseDelete = "/admin/course/delete/"
const questionAdd = "/admin/question/add"
const questionGetAll = "/admin/question/all"
const freeQuestionGetAll = "/admin/question/free/all"

const questionDetailsById = "/admin/question/details/"
const questionDelete = "/admin/question/delete/"
const questionUpdate = "/admin/question/update/"
const getAdminModaretorBlogs = "/user/blog/admin/me"

const postSliders = "/admin/slider/create"
const getPublicSliders = "/admin/slider/get-all"
const deleteSliders = "/admin/slider/delete/"

// result / questions
const getResultAll = "/results/get/all"
const getResultMe = "/results/get/me"
const getResultById = "/results/get/"
const deleteResult = "/results/delete/"    // for admin if needed


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
    getCourseById,
    adminUpdateCourse,
    courseDelete,
    questionAdd,
    questionGetAll,
    freeQuestionGetAll,
    questionDetailsById,
    questionUpdate,
    questionDelete,
    getAdminModaretorBlogs,

    postSliders, getPublicSliders,deleteSliders,

    /// results / questions
    getResultAll, getResultMe, getResultById, deleteResult

}
