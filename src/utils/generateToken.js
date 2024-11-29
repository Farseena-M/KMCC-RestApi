import jwt from 'jsonwebtoken';

const generateToken = (id, iqamaNumber) => {
    return jwt.sign(
        { id, iqamaNumber }, `${process.env.JWT_SECRET}`, {
        expiresIn: process.env.LOGIN_EXPIRES
    })
}

export default generateToken;