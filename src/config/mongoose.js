import mongoose from "mongoose";
import env from "./env";

try {
    // mongodb connection established
    mongoose.connect(env.MONGODB_URL, { useNewUrlParser: true,useCreateIndex: true, useUnifiedTopology: true },(error) => {
        if(error){
            console.error('Error : unable to connect mongodb\n'+error.toString());
        }else{
            console.error(`Mongodb connected successfully`);
        }
    });
} catch (exp) {
    console.log('Exception occurs'+exp);
}