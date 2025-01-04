export const isValidEmailPhone = (emailPhone) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    const phoneRegex = /^(01[3-9]\d{8})$/;

    return emailRegex.test(emailPhone) || phoneRegex.test(emailPhone);
};


export const isValidPassword = (password) => {
    return password.length > 5
}

 