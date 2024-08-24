import bcrypt, { hashSync } from "bcrypt";

const saltRounds = 10;

export const hashPassword = (password) => {
    const salt = bcrypt.genSaltSync(saltRounds);
    return bcrypt.hashSync(password, salt);
};

export const comparePassword = (plainPass, hashedPass) => {
    return bcrypt.compareSync(plainPass, hashedPass);
};
