import { User, Role } from "../models";
import { UserDTO } from "../dto/UserDto";
import {
    NotFoundError,
    BadRequestError,
} from "../errors";
import { ApiResponse } from "../enums/ResponseCodes";
import { generateToken, Validator } from "../utils";
import { userRepository } from "../data-access";
import PasswordService  from "./PasswordService";

export default class UserService {
    private passwordService: PasswordService;
    constructor() {
        this.passwordService = new PasswordService();
    }   

    async createUser(userData: UserDTO): Promise<User> {

        const validator = new Validator();
        // Validate if the username is in use
        const existingUsername = await User.findOne({ where: { username: userData.username } });

        validator.check(!existingUsername, "username", userData.username, "Username is already taken");
        // Validate if the email is in use
        const existingEmail = await User.findOne({ where: { email: userData.email } });
        validator.check(!existingEmail, "email", userData.email, "Email is already taken");

        if (userData.phone_number?.trim() === "") {
            validator.addError("phone_number", userData.phone_number, "Phone number is required and cannot be empty");
        } else {
            const existingPhoneNumber = await User.findOne({ where: { phone_number: userData.phone_number } });
            validator.check(!existingPhoneNumber, "phone_number", userData.phone_number, "Phone number is already taken");
        }
        validator.throwIfErrors("Failed at one of the required validations");

        // Create the new user
        const newUser = new User();
        newUser.username = userData.username;
        newUser.email = userData.email;
        newUser.phone_number = userData.phone_number ?? "";
        newUser.profile_picture_url = userData.profile_picture_url ?? "";
        newUser.role = userData.role ?? "user";
        newUser.address = userData.address ?? "";
        newUser.gender = userData.gender ?? null;
        newUser.rating = userData.rating ?? 0.0;
        newUser.is_verified = userData.is_verified ?? false;
        newUser.is_active = userData.is_active ?? true;
        newUser.created_by = userData.created_by ?? 1;
        newUser.modified_by = userData.modified_by ?? 1;

        await newUser.save();
        return newUser;
    }

    async getUsers(
        page: number = 1,
        limit: number = 10,
        filters: Record<string, any> | null = null,
    ): Promise<ApiResponse<{
        items: User[];
        total: number;
        page: number;
        limit: number;
        totalPages: number;
    }>> {
        // Ensure page and limit are positive numbers
        page = Math.max(page, 1);
        limit = Math.max(limit, 1);

        // Validate filters
        if (filters && typeof filters !== 'object') {
            return {
                status: 400,
                success: false,
                message: "Invalid filter parameters",
                timestamp: new Date().toISOString(),
                data: undefined,
            };
        }

        try {
            // Fetch users with pagination and filters
            const { count, rows } = await userRepository.findAndCountAll(page, limit, filters);

            // Calculate total pages based on count and limit
            const totalPages = Math.ceil(count / limit);

            // Check if the requested page is greater than the total pages
            if (page > totalPages) {
                return {
                    status: 404,
                    success: false,
                    message: "Requested page exceeds available pages",
                    timestamp: new Date().toISOString(),
                    data: {
                        items: [],
                        total: count,
                        page,
                        limit,
                        totalPages,
                    },
                };
            }

            return {
                status: 200,
                success: true,
                message: "Users retrieved successfully",
                timestamp: new Date().toISOString(),
                data: {
                    items: rows,
                    total: count,
                    page,
                    limit,
                    totalPages,
                },
            };
        } catch (error: any) {
            console.error("Error fetching users:", error);
            return {
                status: 500,
                success: false,
                message: "Failed to retrieve users",
                timestamp: new Date().toISOString(),
                data: error.message,
            };
        }
    }

    async getUserById(id: number): Promise<User | null> {
        const user = await userRepository.findById(id);
        return user || null;
    }

    async getUserByUsername(username: string): Promise<User | null> {
        const user = await userRepository.findByUsername(username);
        return user || null;
    }

    public async getUserByEmail(email: string): Promise<User | null> {
        const user = await userRepository.findByEmail(email);
        return user || null;
    }

    async getUserByPhoneNumber(phone_number: string): Promise<User | null> {
        const user = await userRepository.findByPhoneNumber(phone_number);
        return user || null;
    }

    async updateUser(userId: number, userData: UserDTO): Promise<User> {
        const user = await userRepository.findById(userId);
        if (!user) {
            throw new NotFoundError("User not found");
        }

        const validator = new Validator();
        if (userData.username !== undefined) {
            const existingUsername = await this.getUserByUsername(userData.username);
            validator.check(
                !existingUsername || existingUsername.id === userId,
                "username",
                userData.username,
                "Username is already taken"
            );
        }
        if (userData.email !== undefined) {
            const existingEmail = await this.getUserByEmail(userData.email);
            validator.check(
                !existingEmail || existingEmail.id === userId,
                "email",
                userData.email,
                "Email is already in use"
            );
        }
        if (userData.phone_number !== undefined) {
            if (userData.phone_number.trim() === "") {
                validator.addError(
                    "phone_number",
                    userData.phone_number,
                    "Phone number cannot be empty"
                );
            } else {
                const existingPhoneNumber = await this.getUserByPhoneNumber(userData.phone_number);
                validator.check(
                    !existingPhoneNumber || existingPhoneNumber.id === userId,
                    "phone_number",
                    userData.phone_number,
                    "Phone number is already in use"
                );
            }
        }
        // Throw validation errors if any
        validator.throwIfErrors("Failed at one of the required validations");
        const updatedData = {
            username: userData.username ?? user.username,
            email: userData.email ?? user.email,
            phone_number: userData.phone_number ?? user.phone_number,
            profile_picture_url:
                userData.profile_picture_url ?? user.profile_picture_url,
            gender: userData.gender ?? user.gender,
            location: userData.address ?? user.address,
            rating: userData.rating ?? user.rating,
            is_verified: userData.is_verified ?? user.is_verified,
            is_active: userData.is_active ?? user.is_active,
            status: userData.status ?? user.status,
            modified_by: userData.modified_by ?? user.modified_by,
        };
        await user.update(updatedData);
        return user;
    }

    async deleteUser(userId: number): Promise<boolean> {
        const isDeleted = await userRepository.deleteUser(userId);
        if (!isDeleted) {
            throw new NotFoundError("User not found");
        }
        return isDeleted;
    }

    async isUserVerified(userId: number): Promise<boolean> {
        const user = await userRepository.findById(userId);
        if (!user) {
            throw new NotFoundError("User not found");
        }
        return user.is_verified;
    }

    async verifyUser(userId: number): Promise<boolean> {
        const user = await userRepository.findById(userId);
        if (!user) {
            throw new NotFoundError("User not found");
        }
        user.is_verified = true;
        await user.save();
        return true;
    }

    async changeUserRole(userId: number, newRole: string): Promise<User> {
        const user = await userRepository.findById(userId);
        if (!user) {
            throw new NotFoundError("User not found");
        }
        const role = await Role.findOne({ where: { role_name: newRole } });
        if (!role) {
            throw new BadRequestError("Invalid role provided");
        }
        user.role = role.role_name;
        await user.save();
        return user;
    }

    async toggleUserActiveStatus(userId: number): Promise<User> {
        const user = await userRepository.findById(userId);
        if (!user) {
            throw new NotFoundError("User not found");
        }
        user.deletedAt ? user.restore() : user.destroy();
        return user;
    }

    async getDeletedUsers(): Promise<User[]> {
        const users = await userRepository.getDeletedUsers();
        return users;
    }

    async changePassword(
        userId: number,
        oldPassword: string,
        newPassword: string,
      ): Promise<string> {
        const isValid = await this.passwordService.validatePassword(
          userId,
          oldPassword,
        );
        if (!isValid) {
          throw new BadRequestError("Old password is incorrect");
        }
    
        if (oldPassword === newPassword) {
          throw new BadRequestError(
            "New password cannot be the same as old password",
          );
        }
    
        await this.passwordService.resetPassword(userId, newPassword);
        return "Password changed successfully";
      }





}
