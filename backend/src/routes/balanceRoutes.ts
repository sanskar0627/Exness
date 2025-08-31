import { Router } from "express";
import { authmiddleware } from "../middleware/authMiddleware.js";
import { getBalance, updateBalance } from "../controller/balanceController.js";

const router = Router();

router.get('/',authmiddleware,getBalance)
router.get('/update',authmiddleware,updateBalance)



export default router;