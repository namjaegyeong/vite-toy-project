// Interface for the duplicate check request body
export interface CheckIdExistsRequest {
    userId: string;
}

// Interface for the duplicate check response body
export interface GenericStatusResponse {
    result: boolean;
}