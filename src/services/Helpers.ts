
export interface Response<T> {
    isSuccess: Boolean;
    data: T;
    errorDetails: ErrorDetails;
}


export async function ServiceCaller<T>(url: string, options: RequestInit = {}): Promise<Response<T>> {
    if (!process.env.BASE_URL) {
        throw new Error("There is no base url.");
    }
    const token = 123 //get token from local storage
    const headers = {
        ...options.headers,
        "Authorization": `Bearer ${token}`,
        "Content-Type": "application/json"
    };
   
    const response = await fetch(url, {
        ...options,
        headers,
    });

    if (!response.ok) {
        throw new Error(`Failed to fetch: ${response.status}`);
    }

   

    return response.json() as Promise<Response<T>>;
}


export function CatchHttpError(error: unknown, entityName: string, action: string) {
    console.error('Error occurred:', error);

    const errorMessage = `Error ${action} ${entityName}: ` + ((error as Error).message || 'Unknown error');
    const errorStack = (error as Error).stack ? '\nStack: ' + (error as Error).stack : '';
    throw new Error(errorMessage + errorStack);
}
