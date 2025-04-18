import { Request } from "express";
import { User } from "../models";

export interface AuthenticatedRequest extends Request {
  user?: User;
}
