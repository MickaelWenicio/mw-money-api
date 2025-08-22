export class AppError extends Error {
    public statusCode: number;

    constructor(message: string, errorMessage = 'bad_request') {
        super(message);
        const values: Record<string, number> = {
            'bad_request': 400 ,
            'internal_server_error': 500,
            'not_found': 404
        }
        this.statusCode = values[errorMessage] || 400;
        Error.captureStackTrace(this, this.constructor);
    }
}