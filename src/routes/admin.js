import express from "express";
const AdminRouter = express.Router();

// controller injection
import * as UserController from "../controllers/UserController";

AdminRouter.get('/',UserController.index);
AdminRouter.get('/2',UserController.second);

module.exports = AdminRouter;