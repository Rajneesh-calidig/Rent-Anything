import express from "express"
const router=express.Router()
import {getNewUsers,updateNewUser,getNewLister,updateNewLister} from "../../controllers/admin.controller.js"


router.get("/new-user",getNewUsers)
router.get("/new-lister",getNewLister)

router.put("/update-newuser/:id",updateNewUser)
router.put("/update-newlister/:id",updateNewLister)


export default router