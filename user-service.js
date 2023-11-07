const users = [];

function canLogin(email, password) {
    const user = users.find((user) => user.email === email);
    if (user) {
        const matched = user.password === password;

        return matched; 
    }

    return false;
}

function register(user) {
    users.push(user);
    console.log("Registered", user);
}

module.exports = {
    canLogin: canLogin,
    register: register
}