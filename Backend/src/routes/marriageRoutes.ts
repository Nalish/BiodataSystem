import express from "express"
import { protect } from "../middlewares/auth/protect"
import { adminClergyGuard, adminGuard } from "../middlewares/auth/roleMiddleWare"
import { createMarriage, deleteMarriage, getMarriage, getMarriageById, updateMarriage } from "../controllers/marriageController"

//instance of router
const router = express.Router()

//Librarian Access
//Librarians can create, update, and delete books
router.post("/", createMarriage)
router.get("/", getMarriage)
router.get("/:id", protect,adminClergyGuard, getMarriageById)
router.put("/:id", protect,adminClergyGuard, updateMarriage)



//Admins can manage all books
//Admins can create, update, and delete books
router.delete("/:id", protect,adminGuard, deleteMarriage)



export default router