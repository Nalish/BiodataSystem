import express from "express"
import { protect } from "../middlewares/auth/protect"
import { adminClergyGuard, adminGuard } from "../middlewares/auth/roleMiddleWare"
import { createEucharist, deleteEucharist, getEucharist, getEucharistById, updateEucharist } from "../controllers/eucharistController"

//instance of router
const router = express.Router()

//Librarian Access
//Librarians can create, update, and delete books
router.post("/", protect,adminClergyGuard, createEucharist)
router.get("/", getEucharist)
router.get("/:id", protect,adminClergyGuard, getEucharistById)
router.put("/:id", protect,adminClergyGuard, updateEucharist)



//Admins can manage all books
//Admins can create, update, and delete books
router.delete("/:id", protect,adminGuard, deleteEucharist)



export default router