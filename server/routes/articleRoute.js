import express from "express";
import { buisnessArticle, mobilePhones, techCrunch, teslaArticle } from "../controllers/articleController.js";

const router=express.Router();

//NEWSAPI
router.get('/tesla',teslaArticle);
router.get('/buisness',buisnessArticle);
router.get('/mobiles',mobilePhones);
router.get('/techCrunch',techCrunch);

export default router;