import { Router } from "express"
import { 
    getUsers,
    getUserByUsername,
    createUser,
    updateUser,
    deleteUser
} from "../controllers/user"

const router = Router()

router.get("/", getUsers)
router.get("/:username", getUserByUsername)
router.post("/", createUser)
router.put("/:id", updateUser)
router.delete("/:id", deleteUser)

export default router