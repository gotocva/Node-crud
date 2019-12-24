 
const Cryptr = require('cryptr');
import env from "../config/env";
const cryptr = new Cryptr(env.SECRET);
 
export const encrypt = (str) => {
    return new Promise((resolve,reject) => {
        try {
            resolve(cryptr.encrypt(str.toString()));
        } catch (error) {
            reject(false);
        }
    })
};

export const decrypt = (str) => {
    return new Promise((resolve,reject) => {
        try {
            resolve(cryptr.decrypt(str));
        } catch (error) {
            reject(false);
        }
    })
};
