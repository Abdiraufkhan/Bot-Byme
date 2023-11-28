import { IError } from "interfaces/error.interface";
import { ErrorMessage } from "../enums/error-message.enum";
import { StatusCode } from "../enums/status-code.enum";

export class NotFoundError implements IError {
    public statusCode: StatusCode = StatusCode.NotFound;
    public message: ErrorMessage;

    constructor(message: ErrorMessage) {
        this.message = message;
    }
}
