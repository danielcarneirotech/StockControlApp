import { getReport } from './reportService.ts';
import api from '../api';
import { GetReportPayload, GetReportResponse } from '../../types/report';

jest.mock('../api', () => ({
  __esModule: true,
  default: {
    get: jest.fn(),
  },
}));

describe('getReport', () => {
  it('should fetch a report and return the response data', async () => {
    const mockReportPayload: GetReportPayload = {
      reportDate: '2023-01-01',
    };

    const mockResponse: GetReportResponse = {
      $id: '1',
      $values: [
        {
          productName: 'Product 1',
          productCode: 'P001',
          checkinQuantity: 100,
          checkoutQuantity: 50,
          balance: 50,
        },
        {
          productName: 'Product 2',
          productCode: 'P002',
          checkinQuantity: 200,
          checkoutQuantity: 100,
          balance: 100,
        },
      ],
    };

    (api.get as jest.Mock).mockResolvedValue({ data: mockResponse });

    const result = await getReport(mockReportPayload);

    expect(api.get).toHaveBeenCalledWith('/stockreport', {
      params: mockReportPayload,
    });
    expect(result).toEqual(mockResponse);
  });

  it('should handle errors when fetching a report', async () => {
    const mockReportPayload: GetReportPayload = {
      reportDate: '2023-01-01',
    };

    const mockError = new Error('Network error');
    (api.get as jest.Mock).mockRejectedValue(mockError);

    await expect(getReport(mockReportPayload)).rejects.toThrow('Network error');
  });

  it('should handle validation errors when fetching a report', async () => {
    const mockReportPayload: GetReportPayload = {
      reportDate: '',
    };

    const mockError = new Error('Validation error');
    (api.get as jest.Mock).mockRejectedValue(mockError);

    await expect(getReport(mockReportPayload)).rejects.toThrow('Validation error');
  });

  it('should fetch a report with a specific productCode and return the response data', async () => {
    const mockReportPayload: GetReportPayload = {
      reportDate: '2023-01-01',
      productCode: 'P001',
    };

    const mockResponse: GetReportResponse = {
      $id: '1',
      $values: [
        {
          productName: 'Product 1',
          productCode: 'P001',
          checkinQuantity: 100,
          checkoutQuantity: 50,
          balance: 50,
        },
      ],
    };

    (api.get as jest.Mock).mockResolvedValue({ data: mockResponse });

    const result = await getReport(mockReportPayload);

    expect(api.get).toHaveBeenCalledWith('/stockreport', {
      params: mockReportPayload,
    });
    expect(result).toEqual(mockResponse);
  });
});
