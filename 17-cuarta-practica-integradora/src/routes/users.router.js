import { Router } from "express";
import {updateUserRole} from "../controllers/users.controller.js"
const router = Router();

router.patch('/premium/:uid', updateUserRole);

router.patch('/user/:uid', updateUserRole);

  export default router;