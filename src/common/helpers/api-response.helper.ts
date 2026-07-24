import { Messages } from "../constants/messages";

export class ApiResponse {

    static success(
        message: string,
        data: any = null,
        statusCode = 200,
    ) {
        return {
            success: true,
            statusCode,
            message: message ? message : Messages.CREATE_SUCCESS,
            data,
            // timestamp: new Date().toISOString(),
        };
    }

    static error(
        message: string,
        statusCode = 400,
        errors: any = null,
    ) {
        return {
            success: false,
            statusCode,
            message,
            errors,
            // timestamp: new Date().toISOString(),
        };
    }

    // Send this response for Change Status API's:
    static status_message(message: string, statusCode = 200) {
        return {
            statusCode,
            message,
        };
    }
}