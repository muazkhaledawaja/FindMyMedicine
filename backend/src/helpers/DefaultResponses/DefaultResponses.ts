import { Response } from "express";
import { StatusCodes } from "http-status-codes";
import { HttpStatus } from "../../enums/ResponseCodes";

export const InternalServerErrorResponse = (res: Response) => {
  return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
    l: HttpStatus.INTERNAL_SERVER_ERROR,
    Message: "Internal server error, please try again later.",
  });
};
