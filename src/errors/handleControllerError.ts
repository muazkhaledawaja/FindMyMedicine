import { Response } from "express";
import { UserAlreadyExistsError } from "./AuthenticationErrors";

export const handleControllerError = (error: any, res: Response) => {
  if (error.errors) {
    // Handle validation errors
    res.status(400).json({
      message: error.message || "Validation failed",
      errors: error.errors,
      timestamp: new Date().toISOString(),
    });
  } else {
    // Handle other errors
    res.status(500).json({
      message: error.message || "An unexpected error occurred",
      timestamp: new Date().toISOString(),
    });
  }
};
