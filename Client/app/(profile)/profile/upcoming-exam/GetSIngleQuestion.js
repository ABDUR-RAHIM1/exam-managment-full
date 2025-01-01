const { getDataById } = require("@/app/actions/globals/getDataById");
const { questionDetailsById } = require("@/app/constans/constans");


const getSingleQuestion = async (questionId) => {
    const apiEndPoint = `${questionDetailsById + questionId}`;
    const { status, result } = await getDataById(apiEndPoint);
    return { status, result }
}

export default getSingleQuestion