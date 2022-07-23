const validateEmail = email => {
    const mailformat = /^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+\.[a-zA-Z0-9-.]+$/;

    if (email?.match(mailformat)) return true;

    return false;
};

export const loginValidator = ({ email, password, setError}) => {
    let result = true;
    console.log(password)

    if (!email?.length || !password?.length) {
        setError('All fields are mandatory.');
        result = false;
    } else if (!validateEmail(email)) {
        setError('Enter valid email.');
        result = false;
    } else if (password?.length < 6) {
        setError('Password should be greater than 5 characters.');
        result = false;
    }


    return result;
};