import { User, Role } from "../models/index";

import { UserRepository } from "./UserRepository";
import { RoleRepository } from "./RoleRepository";

export const userRepository = new UserRepository(User);
export const roleRepository = new RoleRepository(Role);
