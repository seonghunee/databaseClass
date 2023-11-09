function isEmpty(value) {
    return !value || value.trim() === '';
}

function userCredentialsAreValid(email, password) {
    return (
        email && email.includes('@') && password && password.trim().length >= 6
    );
}

function userDetailsAreValid(name, id, password, email, phoneNumber) {
    return (
        userCredentialsAreValid(email, password) &&
        !isEmpty(name) &&
        !isEmpty(id) &&
        !isEmpty(phoneNumber)
    );
}

function passwordIsConfirmed(password, confirmPassword) {
    return password === confirmPassword;
}

module.exports = {
    userDetailsAreValid: userDetailsAreValid,
    passwordIsConfirmed: passwordIsConfirmed,
};