
import User from "../model/UserSchema";
import LoginLog from "../model/log/LoginLogSchema";
import { encrypt, decrypt } from "../utils/crypto";

/**
 * Function to create a user
 * 
 * @param {Object} req 
 * @param {Object} res 
 */
export const store = async (req,res) => { 
    console.log(`\nMethod = ${req.method}; URI = ${req.originalUrl} hitted with ${JSON.stringify(req.query)} ${JSON.stringify(req.params)} ${JSON.stringify(req.body)}`);

    // hash password
    req.body.password = req._hash(req.body.password);
    req.body.nonce = Date();

    // generate user token 
    req.body.token = await encrypt(req.body);
    // create's an user object from request body
    const user = new User(req.body);
    
    console.log(`\nuser schema object ${user}`);
    
    user.save((error,result) => { 
        console.log(`\nError : ${error}`);
        console.log(`\nResult : ${result}`);
        
        if (error) {
            res.error(error,req.__lang().user.create_error);
        } else {
            res.success(result,req.__lang().user.create_success);
        }
    });
};

/**
 * Function to login user
 * @param {Object} req 
 * @param {Object} res 
 */
export const login = (req,res) => {

    console.log(`\nMethod = ${req.method}; URI = ${req.originalUrl} hitted with ${JSON.stringify(req.query)} ${JSON.stringify(req.params)} ${JSON.stringify(req.body)}`);
    // hash password
    req.body.password = req._hash(req.body.password);
    User.findOne({ $and: [ { email:req.body.email }, { password:req.body.password } ] }).lean().exec((error,result) =>{
        console.log(`Error : ${error}`);
        console.log(`Result : ${result}`);
        if (error) {
            res.error(error,req.__lang().user.login_error);
        } else {
            req.user = result._id;
            LoginLog.log(req);
            res.success(result,req.__lang().user.login_success);
        }
    })
}