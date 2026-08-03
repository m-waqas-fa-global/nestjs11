import { Messages } from "../constants/messages";

export class ApiResponse {

    static success(
        message: string,
        data: any = null,
        statusCode = 200,
    ) {
        const response = {
            success: true,
            statusCode,
            message: message ? message : Messages.CREATE_SUCCESS,
            data,
            // timestamp: new Date().toISOString(),
        };
        data == null ?  delete response.data : null;
        return response;
    }

    static error(
        message: string = "Something went wrong!",
        statusCode = 400,
        errors: any = null,
    ) {
        const obj  = {
            success: false,
            statusCode,
            message,
            errors,
            // timestamp: new Date().toISOString(),
        };
        errors == null ? delete obj.errors : null;
        return  obj;
    }

    // Send this response for Change Status API's:
    static status_message(message: string, statusCode = 200) {
        return {
            statusCode,
            message,
        };
    }
}