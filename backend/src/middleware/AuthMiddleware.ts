import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";
import { User } from "../models";
import { isTokenBlacklisted, AuthenticatedRequest } from "../helpers";
import { CustomError } from "../errors/CustomError";

const authAndRoleMiddleware = (allowedRoles: string[]) => {
  return (req: AuthenticatedRequest, res: Response, next: NextFunction) => {
    (async () => {
      try {
        const extractToken = (req: Request): string | undefined =>
          req.headers.authorization?.split(" ")[1] || req.cookies?.token;

        const token = extractToken(req);

        if (!token) {
          return res.status(401).json({ error: "Authorization token missing" });
        }

        if (isTokenBlacklisted(token)) {
          return res.status(401).json({ error: "Token has been invalidated" });
        }

        const decoded = jwt.verify(token, process.env.JWT_SECRET as string) as {
          id: number;
          role: string;
        };

        const user = await User.findByPk(decoded.id);

        if (!user) {
          return next(new CustomError("User not found", 401));
        }

        if (["admin", ...allowedRoles].includes(user.role || "")) {
          req.user = user;
          return next();
        }

        return next(new CustomError("Access forbidden: insufficient role", 403));
      } catch (error) {
        if (error instanceof jwt.TokenExpiredError) {
          return res.status(401).json({ error: "Token has expired" });
        }
        if (error instanceof jwt.JsonWebTokenError) {
          return res.status(401).json({ error: "Invalid token" });
        }
        return next(error); // Pass other errors to Express error handler
      }
    })();
  };
};


export default authAndRoleMiddleware;
