exports.password = /^(?=.*?[0-9])(?=.*?[A-Z])(?=.*?[.#?!@$%^&*\\-_]).{8,60}$/;

exports.mongoID = /^[a-f\d]{24}$/i;
