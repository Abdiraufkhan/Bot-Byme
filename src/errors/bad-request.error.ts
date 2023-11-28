import { ErrorMessage } from "enums/error-message.enum";
import { StatusCode } from "../enums/status-code.enum";
import { IError } from "../interfaces/error.interface";

export class BadRequestError implements IError {
    public statusCode: StatusCode = StatusCode.BadRequest;
    public message: ErrorMessage;

    constructor(message: ErrorMessage) {
        this.message = message;
    }
}
