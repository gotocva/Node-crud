
import express from "express";
const ApiRouter = express.Router();

// controller injection
import * as UserController from "../controllers/UserController";

ApiRouter.get('/',UserController.index);
ApiRouter.get('/2',UserController.second);

ApiRouter.post('/create-user',UserController.store);
ApiRouter.get('/user/:id',UserController.get);
ApiRouter.get('/user',UserController.getAll);

ApiRouter.post('/create-user-profile',UserController.storeProfile);
module.exports = ApiRouter;
