import jwt from 'jsonwebtoken';

const generateToken = (id, iqamaNumber) => {
    return jwt.sign(
        { id, iqamaNumber }, `${process.env.USER_JWT_SECRET}`, {
        expiresIn: process.env.LOGIN_EXPIRES
    })
}

export default generateToken;