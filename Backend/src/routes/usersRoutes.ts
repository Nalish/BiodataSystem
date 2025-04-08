import express from "express"
import { createUser, deleteUser, getUserById, getUsers, updateUser } from "../controllers/usersController"
import { adminClergyGuard, adminGuard,  } from "../middlewares/auth/roleMiddleWare"
import { protect } from "../middlewares/auth/protect"

//instance of router
const router = express.Router()

//

//Librarian can manage all users
//Librarians can create, update and get users
// router.post("/",createUser)
router.get("/", getUsers)
router.get("/:id", getUserById)
router.put("/:id",updateUser)

//Admins can manage all users
//Admins can create, update, and delete users
router.delete("/:id", deleteUser)




export default router