const userModel = require("../models/userModel");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

const registerUser = (req, res) => {
    const { name, email, password } = req.body;

    if (!name || !email || !password) {
        return res.status(400).json({
            message: "Name, email and password are required"
        });
    }

    const trimmedName = name.trim();
    const trimmedEmail = email.trim().toLowerCase();

    if (trimmedName.length < 2) {
        return res.status(400).json({
            message: "Name must be at least 2 characters long"
        });
    }

    if (trimmedName.length > 100) {
        return res.status(400).json({
            message: "Name must not exceed 100 characters"
        });
    }

    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(trimmedEmail)) {
        return res.status(400).json({
            message: "Please provide a valid email address"
        });
    }

    if (trimmedEmail.length > 150) {
        return res.status(400).json({
            message: "Email must not exceed 150 characters"
        });
    }

    if (password.length < 8) {
        return res.status(400).json({
            message: "Password must be at least 8 characters long"
        });
    }

    bcrypt.hash(password, 10, (err, hashedPassword) => {
        if (err) {
            console.error(err);

            return res.status(500).json({
                message: "Failed to secure password"
            });
        }

        userModel.createUser(
            trimmedName,
            trimmedEmail,
            hashedPassword,
            (err, result) => {
                if (err) {
                    console.error(err);

                    if (err.code === "ER_DUP_ENTRY") {
                        return res.status(409).json({
                            message: "Email already registered"
                        });
                    }

                    return res.status(500).json({
                        message: "Failed to register user"
                    });
                }

                res.status(201).json({
                    message: "User registered successfully",
                    userId: result.insertId
                });
            }
        );
    });
};

const loginUser = (req, res) => {
    const { email, password } = req.body;

    if (!email || !password) {
        return res.status(400).json({
            message: "Email and password are required"
        });
    }

    const trimmedEmail = email.trim().toLowerCase();

    userModel.findUserByEmail(trimmedEmail, (err, results) => {
        if (err) {
            console.error(err);

            return res.status(500).json({
                message: "Failed to login"
            });
        }

        if (results.length === 0) {
            return res.status(401).json({
                message: "Invalid email or password"
            });
        }

        const user = results[0];

        console.log("LOGIN USER:", user);

        bcrypt.compare(password, user.password, (err, isMatch) => {
            if (err) {
                console.error(err);

                return res.status(500).json({
                    message: "Failed to login"
                });
            }

            if (!isMatch) {
                return res.status(401).json({
                    message: "Invalid email or password"
                });
            }

            const token = jwt.sign(
                {
                    userId: user.id,
                    email: user.email,
                    role: user.role
                },
                process.env.JWT_SECRET,
                {
                    expiresIn: "1h"
                }
            );

            res.status(200).json({
                message: "Login successful",
                token
            });
        });
    });
};

module.exports = {
    registerUser,
    loginUser
};