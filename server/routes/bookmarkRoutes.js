import express from "express";
import { addUserBookmark, getUserBookmarks, removeBookmark } from "../controllers/bookmarkController.js";
import { verifyUserToken } from "../middlewares/userMiddleware.js";

const router=express.Router();

router.get('/getBookmark',verifyUserToken,getUserBookmarks)
router.post('/addBookmark',verifyUserToken,addUserBookmark)
router.delete('/removeBookmark/:id',verifyUserToken,removeBookmark)


export default router;