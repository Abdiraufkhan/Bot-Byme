import { INewUser } from "domain/newuser/newuser.interface";
import { Request } from "express";

export interface INewRequest extends Request {
    recipient: string;
}
