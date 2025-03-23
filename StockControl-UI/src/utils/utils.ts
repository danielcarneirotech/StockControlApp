import axios, { AxiosError } from 'axios';
import { showErrorToast } from '../services/ToastService/toastService';
import { ApiResponse } from '../types/apiTypes';

export function handleError(error: unknown, defaultMessage: string) {
  if (axios.isAxiosError(error)) {
    const axiosError = error as AxiosError;
    if (axiosError.response) {
      const apiResponse = axiosError.response.data as ApiResponse<null>;
      if (apiResponse && apiResponse.errors && apiResponse.errors.length > 0) {
        showErrorToast(apiResponse.errors[0].message);
      } else {
        showErrorToast('An error occurred.');
      }
    } else if (axiosError.request) {
      showErrorToast('Network error: The server is not reachable.');
    } else {
      showErrorToast('An unexpected error occurred.');
    }
  } else if (error instanceof Error) {
    showErrorToast(error.message);
  } else {
    showErrorToast(defaultMessage);
  }
}
