import { Router } from "express";
import { signup, signin } from '../controller/authController.js';
const Route = Router();
Route.post('/signup', signup);
Route.post('/signin', signin);
export default Route;
