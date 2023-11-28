import { StatusCode } from "enums/status-code.enum";
import { NextFunction, Request, Response } from "express";
import { IError } from "../interfaces/error.interface";
import { ErrorMessage } from "../enums/error-message.enum";

export const errorResponder = (
    error: IError,
    req: Request,
    res: Response,
    next: NextFunction
) => {
    if (!error.statusCode) {
        return res.status(StatusCode.Internal).json({
            code: ErrorMessage.ServerError,
            message: error.message,
        });
    }

    res.status(error.statusCode).json({
        message: error.message,
        error: error.data,
    });
};
