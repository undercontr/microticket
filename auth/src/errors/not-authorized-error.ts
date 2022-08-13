import { CustomError } from "./custom-error";

export class NotAuthorizedError extends CustomError {
    statusCode = 401;
    serializeErrors() {
        return [
            {message: "Not authorized"}
        ]
    }
}