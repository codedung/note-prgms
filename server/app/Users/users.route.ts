import express, { Router, Request, Response } from "express";
import UsersController from "@/Users/users.ctl";

const router: Router = express.Router();

router.post("/join", UsersController.join);
router.post("/checkEmail", UsersController.checkEmail);
router.post("/login", UsersController.login);

export default router;
