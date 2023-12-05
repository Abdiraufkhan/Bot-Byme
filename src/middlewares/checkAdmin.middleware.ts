import { NextFunction, Request, Response } from "express";
import { verify } from "jsonwebtoken";
import { UnauthorizedError } from "errors/unauthorized.error";
import { ErrorMessage } from "enums/error-message.enum";
import { StatusCode } from "enums/status-code.enum";
import { IPayloadUser } from "interfaces/payloaduser.inreface";
import User from "domain/management/user/user.model";

const verifyToken = (token: string) => {
    try {
        return verify(token, process.env.ACCESS_TOKEN_SECRET);
    } catch (error) {
        throw new UnauthorizedError(ErrorMessage.Unauthorized);
    }
};

export const checkAdminMiddleware = async (
    req: Request & {user:any},
    res: Response,
    next: NextFunction
) => {
    try {
        const token = req.headers["authorization"]; // string

        const payload: IPayloadUser = verifyToken(token) as IPayloadUser; // payload { id, email, name } id = 1

        const user = await  User.findOne({
            where: {
                username: payload.username,
            },
        }); // user

        if (!user) throw new UnauthorizedError(ErrorMessage.Unauthorized);

        req.user = user;

        next();
    } catch (error) {
        res.status(StatusCode.BadRequest).json({
            message: error.message,
        });
    }
};
