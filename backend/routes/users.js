import express from "express";
import { getUsers, deleteUser, createUser, updateUser } from "../controllers/users.js";

const router = express.Router();

router.get("/", getUsers);
router.delete("/:id", deleteUser);
router.post("/create", createUser);
router.put("/:id", updateUser); 

export default router;

