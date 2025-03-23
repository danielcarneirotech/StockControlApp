export interface ApiResponse<T> {
  success: boolean;
  data: T;
  Errors: ApiError[];
  statusCode: number;
}

export interface ApiError {
  code: string;
  message: string;
  field: string;
}
