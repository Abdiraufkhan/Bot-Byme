import { ErrorMessage } from "enums/error-message.enum";

export interface IError {
    statusCode: number;
    message: ErrorMessage;
    data?: object;
}
