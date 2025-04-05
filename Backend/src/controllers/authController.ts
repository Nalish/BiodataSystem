import { Request, Response, NextFunction } from "express"
import pool from "../config/db.config";
import bcrypt from 'bcryptjs'
import { generateToken } from "../utils/helpers/generateToken";
import asyncHandler from "../middlewares/asyncHandler";

export const registerUser = asyncHandler(async (req: Request, res: Response, next: NextFunction) => {
    const { name, email, password, role, father, mother, tribe, clan, birth_place, birth_date, sub_county, residence } = req.body

    // Check if user exists
    const userExists = await pool.query("SELECT id FROM users WHERE email = $1", [email]);

    if (userExists.rows.length > 0) {
        res.status(400).json({ message: "User already exists" });
        return;
    }

    // Hash password
    const salt = await bcrypt.genSalt(10)
    const hashedPassword = await bcrypt.hash(password, salt)

    //insert into users table
    const newUser = await pool.query(
        "INSERT INTO users (name, email, password_hash, role, father, mother, tribe, clan, birth_place, birth_date, sub_county, residence) VALUES ($1,$2,$3,$4,$5,$6,$7,$8,$9,$10,$11,$12) RETURNING *",
        [name, email, hashedPassword, role, father, mother, tribe, clan, birth_place, birth_date, sub_county, residence]
    );


    // Generate user-specific token
    generateToken(res, newUser.rows[0].id, newUser.rows[0].role)

    res.status(201).json({
        message: "User registered successfully",
        user: newUser.rows[0]
    });

    //next() - I will redirect automatically is successfully registered
})



export const loginUser = asyncHandler(async (req: Request, res: Response, next: NextFunction) => {

    const { email, password } = req.body

    // Check if user exists
    const userQuery = await pool.query(
        `SELECT users.id, users.name, users.email, users.password_hash, users.role
        FROM users
        WHERE email = $1`,
        [email]
    );

    if (userQuery.rows.length === 0) {
        res.status(401).json({ message: "Invalid email or password" });
        return;
    }


    //query the user
    const user = userQuery.rows[0];


    // check if the user is already logged in
    if (req.cookies.access_token) {
        res.status(400).json({ message: "User already logged in" });
        return;
    }


    // Compare passwords
    const isMatch = await bcrypt.compare(password, user.password_hash)
    if (!isMatch) {
        res.status(401).json({ message: "Invalid email or password" });
        return;
    }

    // Generate JWT token (user-specific)
    await generateToken(res, user.id, user.role);
    // await console.log("😐😐", req.cookies)


    res.status(200).json({
        message: "Login successful",
        user: {
            id: user.id,
            name: user.name,
            email: user.email,
            role: user.role,
        }
    });

    //next();
})


export const logoutUser = asyncHandler(async (req: Request, res: Response, next: NextFunction) => {
    //Check if user is exists
    const cookies = req.cookies;
    const accessTokenKey = Object.keys(cookies).find(key => key.startsWith('access_token_'));

    if (!accessTokenKey){
        res.status(401).json({ message: "user not logged in"});
        return;
    }



    // Check if user is logged in
    if (!req.cookies.access_token) {
        res.status(401).json({ message: "User not logged in" });
        return;
    }
    // Check if user is logged in with the correct token
    const token = req.cookies[accessTokenKey]; // Access the specific access token
    const userId = token.split('.')[1]; // Extract user ID from the token (assuming it's in the payload)
    const userExists = await pool.query("SELECT id FROM users WHERE id = $1", [userId]);


    // Clear access and refresh tokens properly

    // Invalidate access and refresh tokens
    res.cookie('access_token', "", {
        httpOnly: true,
        secure: process.env.NODE_ENV !== "development",
        sameSite: "strict",
        expires: new Date(0) // Expire immediately
    });

    res.cookie('refresh_token', "", {
        httpOnly: true,
        secure: process.env.NODE_ENV !== "development",
        sameSite: "strict",
        expires: new Date(0) // Expire immediately
    });

    res.status(200).json({ message: "User logged out successfully" });
});


// 😐 {
//     'content-type': 'application/json',
//     'user-agent': 'PostmanRuntime/7.43.2',
//     accept: '*/*',
//     'cache-control': 'no-cache',
//     'postman-token': 'bb7c709f-7dcd-43ae-b722-c2b69e0a0944',
//     host: 'localhost:3000',
//     'accept-encoding': 'gzip, deflate, br',
//     connection: 'keep-alive',
//     'content-length': '68',
//     cookie: 'access_token=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOjYsInJvbGVJZCI6MiwiaWF0IjoxNzQxOTQzNjc0LCJleHAiOjE3NDE5NDQ1NzR9.O_0lQVeM3VW6tWo8b1SJHUudZsgFRbA_ODhQPD8G-Bk; refresh_token=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOjYsImlhdCI6MTc0MTk0MzY3NCwiZXhwIjoxNzQ0NTM1Njc0fQ.sak_bhDvyo-NGeqqpKKf4tnGUZ3Jlx3lMsPMknqGujk'
//   }