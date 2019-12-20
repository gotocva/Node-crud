
import User from "../models/UserSchema";
import UserProfile from "../models/UserProfileSchema";

export const index = (req,res) => {
    res.send("Hello world");
}

export const second = (req,res) => {
    res.send("you are in second");
}

export const storeProfile = (req,res) => {

    const userProfile = new UserProfile(req.body);
    userProfile.save((error,result) => {
        if(error)
        {
            res.json({"status":false,"error":error});
        }else{
            User.findOneAndUpdate({_id:req.body.user_id},{$set:{user_profile:result._id}}).exec();
            res.json({"status":true,"message":"record inserted","data":result});
        }
    });
}

export const store = (req,res) => {
    const user = new User(req.body);
    user.save((error,result) => {
        if(error)
        {
            res.json({"status":false,"error":error});
        }else{
            res.json({"status":true,"message":"record inserted","data":result});
        }
    });
};

export const get = (req,res) => {
    User.findOne({_id:req.params.id}).populate('user_profile').exec((error,result) => {
        if(error)
        {
            res.json({"status":false,"error":error});
        }else{
            res.json({"status":true,"message":"record finded","data":result});
        }
    })
}

export const getAll = (req,res) => {
    User.find(req.query).exec((error,result) => {
        if(error)
        {
            res.json({"status":false,"error":error});
        }else{
            res.json({"status":true,"message":"record finded","data":result});
        }
    })
}