import {dirname} from 'path';
import { fileURLToPath } from 'url';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';


const JWT_secret_key= "hakunamatata"

export const __dirname = dirname(fileURLToPath(import.meta.url));


export  const hashData= async (data)=>{
    //los parametros son la data que quiero hashear y el num de vueltas que quiero que hashee
    return bcrypt.hash(data, 10)
}

export const compareHashData= async (data, hashData)=>{
    return bcrypt.compare(data, hashData);
}

export const generateToken = (user) =>{
    const token= jwt.sign({user},JWT_secret_key,{expiresIn:60})
return token
}