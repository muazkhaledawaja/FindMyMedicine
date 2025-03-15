import { body } from 'express-validator'
import { validateResult } from './validateResult'

export const validateLogin = [
    body('email').isEmail().withMessage('Email is required'),
    body('password').isString().withMessage('Password is required'),
    validateResult,
]

export const validateRegister = [
    body("username").notEmpty().withMessage("Username is required"),
    body("email").isEmail().notEmpty().withMessage("Email is required"),
    body("password")
        .notEmpty()
        .withMessage("Password is required")
        .isStrongPassword()
        .matches(/^[a-zA-Z0-9!@#$%^&*()_+\-=[\]{};':"\\|,.<>/?]*$/)
        .isLength({ min: 6 })
        .withMessage(
            'Password must be at least 6 characters long and contain at least one lowercase letter, one uppercase letter, one number, and one special character'
        ),
    body("phone_number").notEmpty().withMessage("Phone number is required"),
    body("gender").notEmpty().withMessage('Gender is required'),
    validateResult,
]

export const validateLogout = [
    body('token').isEmail().withMessage('Token is required'),
    validateResult,
]

export const validateRequestPasswordReset = [
    body('email').isEmail().withMessage('A valid email is required').notEmpty().withMessage('Email is required'),
    validateResult,  
];


export const validateResetPasswordUsingToken = [
    body('token').isString().withMessage('Token is required').notEmpty().withMessage('Token is required'),
    body('newPassword')
        .isString()
        .withMessage('Password is required')
        .notEmpty()
        .withMessage('Password cannot be empty')
        .isLength({ min: 6 })
        .withMessage('Password must be at least 6 characters long'),
    validateResult,  
];