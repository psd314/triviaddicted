import * as EmailValidator from 'email-validator';

export default function(state) {
    const errors = [];
    // change errors to an object so you can target where messages are printed out ex. error.username, error.confirmPassword
    if (!EmailValidator.validate(state.username)) {
        errors.push("Please enter a valid email address");
    }

    if (state.password !== state.confirmPassword && state.loginStatus === false) {
        errors.push("Passwords do not match");
    }

    if (state.password.trim() === "") {
        errors.push("Password is a required field");
    }

    if (state.confirmPassword.trim() === "" && state.loginStatus === false) {
        errors.push("Confirm Password is a required field");
    }

    if (state.password.length < 8) {
        errors.push("Password must be at least 8 characters");
    }

    return errors;
}
