import { User } from "../models";
import {
    InvalidCredentialsError,
    InternalServerError,
} from "../errors";
import { registerDto } from "../dto";
import {
    addToBlacklist,
    isTokenBlacklisted
} from "../helpers";
import { generateToken, Validator } from "../utils"
import {
    PasswordService,
    UserService,
} from "./index";

export default class AuthService {

    private userService = new UserService();
    private passwordService = new PasswordService();



    public async registerUser(userData: registerDto): Promise<{ user: User, token: string }> {
        const { username, email, password, gender, phone_number } = userData;
        const validator = new Validator();

        // Validate the username 
        const existingUsername = await this.userService.getUserByUsername(username);
        validator.check(!existingUsername, "username", username, "Username is already taken");

        // Validate email
        const existingEmail = await this.userService.getUserByEmail(email);
        validator.check(!existingEmail, "email", email, "Email is already in use");

        // Validate password
        const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;
        validator.check(passwordRegex.test(password), "password", password, "Password must include at least one uppercase letter, one number, and one special character");

        // Validate phone number
        if (phone_number?.trim() === "") {
            validator.addError("phone_number", phone_number, "Phone number is required and cannot be empty");
        } else {
            const existingPhoneNumber = await this.userService.getUserByPhoneNumber(phone_number as string);
            validator.check(!existingPhoneNumber, "phone_number", phone_number, "Phone number is already in use");
        }

        // Validate or assign a default gender
        const validGenders = ["male", "female", "not specified"];
        const sanitizedGender = validGenders.includes(gender)
            ? gender
            : "not specified";

        validator.throwIfErrors("Failed at one of the required validations");

        // Create the user
        const newUser = await this.userService.createUser({
            username,
            email,
            is_verified: false,
            role: "user",
            password,
            gender: sanitizedGender,
            phone_number,
        })

        // Generate a JWT token
        const tokenExpiry = process.env.JWT_EXPIRY || "1h";
        const token = generateToken(
            { id: newUser.id, email: newUser.email },
            tokenExpiry
        );
        if (password) {
            await this.passwordService.setPassWord(newUser.id, password);
        }
        return { user: newUser, token };
    }

    public async loginUser(email: string, password: string): Promise<string> {
        try {
            // check if the user exists
            const user = await this.userService.getUserByEmail(email);
            if (!user) {
                throw new InvalidCredentialsError("Invalid email or password");
            }

            // Validate the password
            const isValidPassword = await this.passwordService.validatePassword(user.id, password);
            if (!isValidPassword) {
                throw new InvalidCredentialsError("Invalid email or password");
            }

            // Ensure JWT_SECRET is defined
            if (!process.env.JWT_SECRET) {
                throw new InternalServerError("JWT secret is not defined");
            }

            // Generate JWT token
            const token = generateToken({
                id: user.id,
                email: user.email,
                role: user.role
            }, "1h");
            return token;
        } catch (error) {
            console.error("Error logging in user:", error);
            if (
                error instanceof InvalidCredentialsError ||
                error instanceof InternalServerError
            ) {
                throw error;
            }
            throw new InternalServerError("Error logging in user");
        }
    }

    public async logoutUser(token: string): Promise<void> {
        try {
            if (!isTokenBlacklisted(token)) {
                addToBlacklist(token);
            }
        } catch (error) {
            console.error("Error logging out user:", error);
            throw new InternalServerError("Error logging out user");
        }
    }


}