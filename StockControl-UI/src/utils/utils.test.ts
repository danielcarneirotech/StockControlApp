import axios, { AxiosError } from 'axios';
import { handleError } from './utils';
import { showErrorToast } from '../services/ToastService/toastService';
import { ApiResponse } from '../types/apiTypes';

jest.mock('axios');
jest.mock('../services/ToastService/toastService');

describe('handleError', () => {
  const defaultMessage = 'Default error message';

  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('should show API error message if response contains errors', () => {
    const mockAxiosError = {
      isAxiosError: true,
      response: {
        data: {
          errors: [
            {
              message: 'API error message',
            },
          ],
        } as ApiResponse<null>,
      },
    } as AxiosError;

    (axios.isAxiosError as unknown as jest.Mock).mockReturnValue(true);

    handleError(mockAxiosError, defaultMessage);

    expect(showErrorToast).toHaveBeenCalledWith('API error message');
  });

  it('should show generic error message if response does not contain errors', () => {
    const error = {
      response: {
        data: {},
      },
    } as unknown as AxiosError<ApiResponse<null>>;

    handleError(error, defaultMessage);

    expect(showErrorToast).toHaveBeenCalledWith('An error occurred.');
  });

  it('should show network error message if request is present', () => {
    const error = {
      request: {},
    } as unknown as AxiosError;

    handleError(error, defaultMessage);

    expect(showErrorToast).toHaveBeenCalledWith('Network error: The server is not reachable.');
  });

  it('should show unexpected error message if no response or request is present', () => {
    const error = {
      message: 'Unexpected error',
    } as unknown as AxiosError;

    handleError(error, defaultMessage);

    expect(showErrorToast).toHaveBeenCalledWith('An unexpected error occurred.');
  });

  it('should show error message from Error object', () => {
    (axios.isAxiosError as unknown as jest.Mock).mockReturnValue(false);

    const mockError = new Error('Test Error Message');

    handleError(mockError, defaultMessage);

    expect(showErrorToast).toHaveBeenCalledWith('Test Error Message');
  });

  it('should show default message for unknown error', () => {
    const unknownError = 'Unknown error';

    handleError(unknownError, defaultMessage);

    expect(showErrorToast).toHaveBeenCalledWith(defaultMessage);
  });
});
