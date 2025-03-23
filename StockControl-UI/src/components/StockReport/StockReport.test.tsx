import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import StockReport from './StockReport';
import { getReport } from '../../services/ReportService/reportService';
import { showErrorToast, showSuccessToast } from '../../services/ToastService/toastService';

jest.mock('../../services/reportService/reportService');
jest.mock('../../services/ToastService/toastService');
jest.mock('../../services/api', () => ({
  __esModule: true,
  default: {
    post: jest.fn(),
    get: jest.fn(),
  },
}));

describe('StockReport Component', () => {
  const setup = () => {
    render(<StockReport />);
  };

  beforeEach(() => {
    jest.clearAllMocks();
  });

  test('renders StockReport component', () => {
    setup();
    expect(screen.getByTestId('stock-report-card')).toBeInTheDocument();
  });

  test('handles input changes', () => {
    setup();
    const transactionDateInput = screen.getByTestId('transaction-date-input');
    const productCodeInput = screen.getByTestId('product-code-input');

    fireEvent.change(transactionDateInput, { target: { value: '2023-10-01' } });
    fireEvent.change(productCodeInput, { target: { value: 'P123' } });

    expect(transactionDateInput).toHaveValue('2023-10-01');
    expect(productCodeInput).toHaveValue('P123');
  });

  test('displays success toast and table on successful report generation', async () => {
    const mockResponse = {
      data: {
        $values: [
          {
            productName: 'Product 1',
            productCode: 'P001',
            checkinQuantity: 10,
            checkoutQuantity: 5,
            balance: 5,
          },
        ],
      },
    };
    (getReport as jest.Mock).mockResolvedValue(mockResponse);
    setup();
    const transactionDateInput = screen.getByTestId('transaction-date-input');
    const productCodeInput = screen.getByTestId('product-code-input');

    fireEvent.change(transactionDateInput, { target: { value: '2023-10-01' } });
    fireEvent.change(productCodeInput, { target: { value: 'P123' } });

    expect(transactionDateInput).toHaveValue('2023-10-01');
    expect(productCodeInput).toHaveValue('P123');
    const generateReportButton = screen.getByTestId('generate-report-button');
    fireEvent.click(generateReportButton);
    await waitFor(() => {
      expect(showSuccessToast).toHaveBeenCalledWith('Report generated successfully');
      expect(screen.getByTestId('table stock-report-table')).toBeInTheDocument();
    });
  });

  test('displays error toast on report generation failure', async () => {
    const mockError = {
      response: {
        data: {
          errors: [{ message: 'Failed to generate report' }],
        },
      },
    };
    (getReport as jest.Mock).mockRejectedValue(mockError);
    setup();
    const generateReportButton = screen.getByTestId('generate-report-button');
    fireEvent.click(generateReportButton);
    await waitFor(() => {
      expect(showErrorToast).toHaveBeenCalledWith('Failed to generate report');
      expect(screen.queryByTestId('table stock-report-table')).not.toBeInTheDocument();
    });
  });
});

