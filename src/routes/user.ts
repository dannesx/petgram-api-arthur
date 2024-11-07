import { Router } from "express"
import { 
    getUsers,
    getUserByUsername,
    createUser,
    updateUser,
    deleteUser
} from "../controllers/user"
import { authenticateToken } from "../middlewares/authenticateToken"

const router = Router()

router.get("/", getUsers)
router.get("/:username", getUserByUsername)
router.post("/", createUser)
router.put("/:id", authenticateToken, updateUser)
router.delete("/:id", authenticateToken, deleteUser)

export default router