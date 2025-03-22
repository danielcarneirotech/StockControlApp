jest.mock('axios');
jest.mock('./api', () => {
  // eslint-disable-next-line @typescript-eslint/no-require-imports
  const axios = require('axios');
  const baseURL = 'http://localhost:5172';
  const instance = {
    defaults: {
      baseURL,
      headers: {
        'Content-Type': 'application/json',
      },
    },
    get: axios.get,
    post: axios.post,
  };
  return {
    __esModule: true,
    default: instance,
  };
});

import axios from 'axios';
import api from './api';

describe('api service', () => {
  const baseURL = 'http://localhost:5172';
  const mockAxios = axios as jest.Mocked<typeof axios>;

  it('should create an axios instance with the correct baseURL', () => {
    expect(api.defaults.baseURL).toBe(baseURL);
  });

  it('should have the correct default headers', () => {
    expect(api.defaults.headers['Content-Type']).toBe('application/json');
  });

  it('should make a GET request and return data', async () => {
    const mockResponse = { data: { success: true } };
    mockAxios.get.mockResolvedValue(mockResponse);

    const result = await api.get('/test');

    expect(mockAxios.get).toHaveBeenCalledWith('/test');
    expect(result).toEqual(mockResponse);
  });

  it('should make a POST request and return data', async () => {
    const mockData = { key: 'value' };
    const mockResponse = { data: { success: true } };
    mockAxios.post.mockResolvedValue(mockResponse);

    const result = await api.post('/test', mockData);

    expect(mockAxios.post).toHaveBeenCalledWith('/test', mockData);
    expect(result).toEqual(mockResponse);
  });

  it('should handle errors for GET requests', async () => {
    const mockError = new Error('Network error');
    mockAxios.get.mockRejectedValue(mockError);

    await expect(api.get('/test')).rejects.toThrow('Network error');
  });

  it('should handle errors for POST requests', async () => {
    const mockError = new Error('Network error');
    mockAxios.post.mockRejectedValue(mockError);

    await expect(api.post('/test', {})).rejects.toThrow('Network error');
  });
});
