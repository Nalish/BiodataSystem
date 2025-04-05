import { Request, Response } from "express"
import pool from "../config/db.config"
import asyncHandler from "../middlewares/asyncHandler"
import bcrypt from "bcrypt"



//This will handle all user-related operations 
export const createUser = asyncHandler(async (req, res) => {
    try {
        const { name, email, password_hash , role } = req.body

        //check if email exists
        const emailCheck = await pool.query("SELECT id FROM users WHERE email = $1", [email])

        if (emailCheck.rows.length > 0) {
            res.status(400).json({
                message: "User already exists"
            })
            return
        }
        //insert the user 
        const userResult = await pool.query(
            "INSERT INTO users (name, email, password_hash, role) VALUES($1, $2, $3, $4) RETURNING *", [name, email, password_hash, role]
        )
        res.status(201).json({
            message: "User successfully created",
            user: userResult.rows[0]
        })
    } catch (error) {
        console.error("Error creating user:", error);
        res.status(500).json({ message: "Internal server error" });
    }
})

//Get All users 
export const getUsers = asyncHandler(async (req, res) => {
    try {
        const
            result = await pool.query("SELECT * FROM users ORDER BY id ASC ")
        res.json(result.rows)
    } catch (error) {
        console.error("Error creating user:", error);
        res.status(500).json({ message: "Internal server error" });
    }
})


//Get single user
export const getUserById = asyncHandler(async (req, res) => {
    try {
        const { id } = req.params
        const
            result = await pool.query("SELECT * FROM users WHERE id = $1", [id])
        if (result.rows.length === 0) {
            res.status(400).json({ message: "User not found" });
            return
        }
        res.json(result.rows[0])
    } catch (error) {
        console.error("Error creating user:", error);
        res.status(500).json({ message: "Internal server error" });
    }
})


//update user

export const updateUser = asyncHandler(async (req, res) => {
    try {
        const { id } = req.params;
        const { name, email, password, role, father, mother, tribe, clan, birth_place, birth_date, sub_county, residence} = req.body;

        // Check if user exists
        const userCheck = await pool.query("SELECT * FROM users WHERE id = $1", [id]);
        if (userCheck.rows.length === 0) {
            res.status(400).json({ message: "User not found" });
            return;
        }

        //before updating a user, we need to hash the passwords
        const salt = await bcrypt.genSalt(10)
        const hashedPassword = await bcrypt.hash(password, salt)

        // Update the user
        const updatedUser = await pool.query(
            "UPDATE users SET name=$1, email=$2, password_hash=$3, role=$4, father=$5, mother=$6, tribe=$7, clan=$8, birth_place=$9, birth_date=$10, sub_county=$11, residence=$12 WHERE id = $13 RETURNING *",
            [name, email, hashedPassword, role, father, mother, tribe, clan, birth_place, birth_date, sub_county, residence, id]
        );

        res.json({
            message: "User successfully updated",
            user: updatedUser.rows[0],
        });
    } catch (error) {
        console.error("Error updating user:", error);
        res.status(500).json({ message: "Internal server error" });
    }
});


//delete user  
export const deleteUser = asyncHandler(async (req, res) => {
    try {
        const { id } = req.params
        const
            result = await pool.query("DELETE FROM users WHERE id = $1 RETURNING *", [id])
        if (result.rows.length === 0) {
            res.status(400).json({ message: "User not found" });
            return
        }
        res.json({ message: "User deleted" })
    } catch (error) {
        console.error("Error creating user:", error);
        res.status(500).json({ message: "Internal server error" });
    }
})
