import { ErrorMessage } from "enums/error-message.enum";
import { StatusCode } from "../enums/status-code.enum";
import { IError } from "../interfaces/error.interface";

export class ConflictError implements IError {
    public statusCode: StatusCode = StatusCode.Conflict;
    public message: ErrorMessage;

    constructor(message: ErrorMessage) {
        this.message = message;
    }
}
