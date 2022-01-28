import httpStatusCode from 'http-status-codes';
import { TypeAPIError as APIErrorType } from './type-of-error';

export interface APIErrorResponse extends Omit<APIErrorType, 'codeAsString'> {
    error: string;
}

export default class APIError {

    public static format(error: APIErrorType): APIErrorResponse {
        return {
          ... {
              message: error.message,
              code: error.code,
              error: error.codeAsString || httpStatusCode.getStatusText(error.code),
          },
          ... (error.documentation && { documentation: error.documentation }),
          ... (error.description && { description: error.description }),  
        };
    }

}