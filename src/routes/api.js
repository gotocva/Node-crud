import express from "express";
import url from "url";

const router = express.Router();

// controller injection
import * as UserController from "../controller/UserController";

// User routes
router.post('/user',UserController.store);
router.post('/user/login',UserController.login);

router.get('/',function(req,res){
    console.log(req);
    res.send(req.useragent);
    // res.send(JSON.stringify(req));
});

module.exports = router;