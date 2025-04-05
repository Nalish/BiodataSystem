import express from "express"
import { protect } from "../middlewares/auth/protect"
import { adminClergyGuard, adminGuard } from "../middlewares/auth/roleMiddleWare"
import { createConfirmation } from "../controllers/confirmController"
import { deleteBaptism, getBaptism, getBaptismById, updateBaptism } from "../controllers/baptismController"

//instance of router
const router = express.Router()

//Librarian Access
//Librarians can create, update, and delete books
router.post("/", protect,adminClergyGuard, createConfirmation)
router.get("/", getBaptism)
router.get("/:id", protect,adminClergyGuard, getBaptismById)
router.put("/:id", protect,adminClergyGuard, updateBaptism)



//Admins can manage all books
//Admins can create, update, and delete books
router.delete("/:id", protect,adminGuard, deleteBaptism)



export default router