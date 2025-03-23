export interface ApiResponse<T> {
  success: boolean;
  data: T;
  errors: ApiError[];
  statusCode: number;
}

export interface ApiError {
  code: string;
  message: string;
  field: string;
}
