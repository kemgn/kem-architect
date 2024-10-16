export interface IForDelete {
    id:string
}

export interface deleteResponse {
    data: boolean;
    isSuccess: boolean;
    errorDetails: string;
}

export interface CrudResponse<T> {
    data: T;
    isSuccess: boolean;
    errorDetails: string;
}