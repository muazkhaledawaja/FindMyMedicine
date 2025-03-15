import { UserPassword } from "../models";
import {
    hashedPassword,
    comparePassword,
    verifyToken,
    generateToken
} from "../utils";
import { UserService } from "./index";
import { Logger } from "../helpers/Logger";
import {
    InvalidTokenError,
    NotFoundError
} from '../errors/index'

export default class PasswordService {
    private userService: UserService;
    constructor() {
        this.userService = new UserService();
    }

    public async setPassWord(userId: number, password: string): Promise<void> {
        const passWordHash = await hashedPassword(password);
        await UserPassword.create({
            user_id: userId,
            password_hash: passWordHash,
        } as any);
    }

    public async validatePassword(
        userId: number,
        password: string,
    ): Promise<boolean> {
        const userPassword = await UserPassword.findOne({
            where: {
                user_id: userId,
            },
        });

        if (!userPassword || !userPassword.password_hash) {
            return false;
        }

        return comparePassword(password, userPassword.password_hash);
    }

    public async resetPassword(
        userId: number,
        newPassword: string,
    ): Promise<void> {
        const passwordHash = await hashedPassword(newPassword);
        await UserPassword.update(
            { password_hash: passwordHash },
            { where: { user_id: userId } },
        );
    }

    public async resetPasswordUsingToken(
        token: string,
        newPassword: string
    ): Promise<void> {
        try {
            Logger.log("Resetting password using token...");

            // Verify the token
            const decodedToken = verifyToken(token);
            if (!decodedToken || !decodedToken.userId) {
                throw new InvalidTokenError('Invalid token');
            }

            const userId = decodedToken.userId;
            const passwordHash = await hashedPassword(newPassword);
            await UserPassword.update(
                { password_hash: passwordHash },
                { where: { user_id: userId } }
            );
            Logger.log("Password reset successfully for user ID: " + userId);
        } catch (error) {
            Logger.warn("Error in resetPasswordUsingToken:", error);
            if (error instanceof InvalidTokenError) {
                throw error;
            }
            throw new Error("Failed to reset password.");
        }
    }


}