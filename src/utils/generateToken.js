import jwt from 'jsonwebtoken';

export const generateTokenUser = (id, iqamaNumber) => {
    return jwt.sign(
        { id, iqamaNumber }, `${process.env.USER_JWT_SECRET}`, {
        expiresIn: process.env.LOGIN_EXPIRES
    })
}


export const generateTokenAdmin = (id) => {
    return jwt.sign({ id }, process.env.ADMIN_JWT_SECRET, {
        expiresIn: process.env.LOGIN_EXPIRES
    });
}
