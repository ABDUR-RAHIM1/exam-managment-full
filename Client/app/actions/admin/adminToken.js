const { cookies } = require("next/headers");

const adminToken = () => {
    const cookieStore = cookies();
    const token = cookieStore.get("adminToken");

    if (!token) {
        return null;
    }

    return token.value;
};

export default adminToken;