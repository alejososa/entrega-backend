import {dirname} from 'path';
import { fileURLToPath } from 'url';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';


export const __dirname = dirname(fileURLToPath(import.meta.url));


export  const hashData= async (data)=>{
    //los parametros son la data que quiero hashear y el num de vueltas que quiero que hashee
    return bcrypt.hash(data, 10)
}

export const compareHashData= async (data, hashData)=>{
    return bcrypt.compare(data, hashData);
}
// export const compareData= async(data, hashData)=>{
    
//     console.log(data);
//     console.log(hashData);
//para cuando este hasheado
//return bcrypt.compare(data, hashData)

//return data===hashData
//}
