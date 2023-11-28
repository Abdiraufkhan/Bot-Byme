import { ErrorMessage } from "../enums/error-message.enum";
import { StatusCode } from "../enums/status-code.enum";
import { IError } from "../interfaces/error.interface";

export class ForbiddenError implements IError {
    public statusCode: StatusCode = StatusCode.Forbidden;
    public message: ErrorMessage;

    constructor(message: ErrorMessage) {
        this.message = message;
    }
}
