import { IUser } from "../interfaces/user.interface";
import { Request } from "express";

export interface IRequest extends Request {
    user: IUser;
}
