// @ts-nocheck
import jwt from 'jsonwebtoken'


export const verifyJWT = (token, secretKey) =>{
  try {
    const decoded = jwt.verify(token, secretKey);
    return decoded
  } catch (error) {
    return null;
  }
}