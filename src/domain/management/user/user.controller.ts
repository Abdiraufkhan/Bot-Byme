import { StatusCode } from "enums/status-code.enum";
import { NextFunction, Request, Response } from "express";
import { IRequest } from "interfaces/request.interface";
import { validation } from "utils/validation.util";
import { LoginUserDto, RegisterUserDto } from "./user.dto";
import UserService from "./user.service";
import { SuccessMessage } from "enums/success-message.enum";

class UserController {
    public service = new UserService();

    public getAll = async (
        req: IRequest,
        res: Response,
        next: NextFunction
    ) => {
        try {
            const result = await this.service.getAll();

            res.status(StatusCode.Ok).json({
                data: result,
            });
        } catch (error) {
            next(error);
        }
    };

    public register = async (
        req: IRequest,
        res: Response,
        next: NextFunction
    ) => {
        try {
            const registerData: RegisterUserDto = req.body;
            await validation(RegisterUserDto, registerData);

            const result = await this.service.register(registerData);

            res.status(StatusCode.Created).json({
                data: result,
            });
        } catch (error) {
            next(error);
        }
    };

    public login = async (req: Request, res: Response, next: NextFunction) =>
    {
        try {
            const logindata: LoginUserDto = req.body;

            await validation(LoginUserDto, logindata);

            const result = await this.service.login(logindata)

            res.status(StatusCode.Ok).json({
                nessage: SuccessMessage.UserLoggedIn,
                access_token: result,
            });
        
        } catch (error) {
            res.status(StatusCode.UnprocessableEntity).json({
                message: "Notog'ri kod",
              });
            
        }
    }
}

export default UserController;
