// Interface for the duplicate check request body
export interface CheckUserIdRequest {
    userId: string;
}

// Interface for the duplicate check response body
export interface CheckUserIdResponse {
    result: boolean;
}