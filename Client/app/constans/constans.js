
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
const adminVerify = "/admin/auth/verify/"
const adminLogin = "/admin/auth/login"   //  admin-auth
const adminRegister = "/admin/auth/register"   //  admin-auth create  new admin or modarator
const getAllAdminModaretors = "/admin/auth/get/all"
const deleteAdminModaretor = "/admin/auth/delete/"

const deleteUser = "/user/delete/"

const addLogo = "/admin/logo/create"
const getLogo = "/admin/logo/get"
const deleteLogo = "/admin/logo/delete/"

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

// contents start 
const postSliders = "/content/slider/create"
const getPublicSliders = "/content/slider/get-all"
const updateSliders = "/content/slider/update/"
const deleteSliders = "/content/slider/delete/"

const createHeadline = "/content/headline/create"
const getHeadline = "/content/headline/get"
const updateHeadline = "/content/headline/"
const deleteHeadline = "/content/headline/"

const createNotice = "/content/notice/create"
const getNotice = "/content/notice/get"
const updateNotice = "/content/notice/update/"
const deleteNotice = "/content/notice/delete/"

const createCourseInfo = "/content/courseInfo/create"
const getCourseInfo = "/content/courseInfo/get"
const updateCourseInfo = "/content/courseInfo/update/"
const deleteCourseInfo = "/content/courseInfo/delete/"

const createLink = "/content/quickLinks/create"
const getLinks = "/content/quickLinks/get"
const updateLink = "/content/quickLinks/update/"
const deleteLink = "/content/quickLinks/delete/"

const createWhy = "/content/whychoose/create"
const getWhy = "/content/whychoose/get-all"
const getWhyById = "/content/whychoose/get"
const updateWhy = "/content/whychoose/update/"
const deleteWhy = "/content/whychoose/delete/"

const createAbout = "/content/about/create"
const getAbout = "/content/about/get"
const updateAbout = "/content/about/update/"
const deleteAbout = "/content/about/delete/"




// contents End 

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

    adminVerify,
    adminLogin,
    adminRegister, getAllAdminModaretors, deleteAdminModaretor,

    deleteUser,
    addLogo, getLogo, deleteLogo,


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

    postSliders, getPublicSliders, deleteSliders, updateSliders,
    createHeadline, getHeadline, updateHeadline, deleteHeadline,
    createNotice, getNotice, updateNotice, deleteNotice,
    createCourseInfo, getCourseInfo, updateCourseInfo, deleteCourseInfo,
    createLink, getLinks, updateLink, deleteLink,
    createWhy, getWhy, getWhyById, updateWhy, deleteWhy,
    createAbout, getAbout, updateAbout, deleteAbout,

    /// results / questions
    getResultAll, getResultMe, getResultById, deleteResult

}
