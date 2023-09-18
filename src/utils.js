import {dirname} from 'path';
import { fileURLToPath } from 'url';
import bcrypt from 'bcrypt';

export const __dirname = dirname(fileURLToPath(import.meta.url));


export  const hashData= async (data)=>{
    //los parametros son la data que quiero hashear y el num de vueltas que quiero que hashee
    return bcrypt.hash(data, 10)
}

export const compareData= async(data, hashData)=>{
    console.log(data);
    console.log(hashData);
//para cuando este hasheado
//return bcrypt.compare(data, hashData)

return data===hashData
}
;