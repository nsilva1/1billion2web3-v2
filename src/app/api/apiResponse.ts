export interface ApiResponse<T> {
    success: boolean
    data: T | null
    error?: string
    statusCode?: number
    timestamp?: string;
}