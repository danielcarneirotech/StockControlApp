import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { AddTransaction } from './AddTransaction';
import { postTransaction } from '../../services/TransactionService/transactionService';
import { showErrorToast, showSuccessToast } from '../../services/ToastService/toastService';

jest.mock('../../services/TransactionService/transactionService');
jest.mock('../../services/ToastService/toastService');
jest.mock('../../services/api', () => ({
  __esModule: true,
  default: {
    post: jest.fn(),
    get: jest.fn(),
  },
}));

describe('AddTransaction', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('renders the AddTransaction component', () => {
    render(<AddTransaction />);
    expect(screen.getByTestId('add-transaction-card-container')).toBeInTheDocument();
    expect(screen.getByLabelText('Product Code:')).toBeInTheDocument();
    expect(screen.getByLabelText('Quantity:')).toBeInTheDocument();
    expect(screen.getByLabelText('Transaction Type:')).toBeInTheDocument();
  });

  it('handles input changes', () => {
    render(<AddTransaction />);
    const productCodeInput = screen.getByTestId('product-code-input');
    const quantityInput = screen.getByTestId('quantity-input');

    fireEvent.change(productCodeInput, { target: { value: 'ABC123' } });
    fireEvent.change(quantityInput, { target: { value: '10' } });

    expect(productCodeInput).toHaveValue('ABC123');
    expect(quantityInput).toHaveValue(10);
  });

  it('handles form submission successfully', async () => {
    (postTransaction as jest.Mock).mockResolvedValue({});
    render(<AddTransaction />);

    const productCodeInput = screen.getByTestId('product-code-input');
    const quantityInput = screen.getByTestId('quantity-input');
    const transactionTypeSelect = screen.getByTestId('transaction-type-select');
    const submitButton = screen.getByTestId('add-transaction-button');

    fireEvent.change(productCodeInput, { target: { value: 'ABC123' } });
    fireEvent.change(quantityInput, { target: { value: '10' } });
    fireEvent.change(transactionTypeSelect, { target: { value: '1' } });

    fireEvent.click(submitButton);

    await waitFor(() => {
      expect(postTransaction).toHaveBeenCalledWith({
        productCode: 'ABC123',
        quantity: 10,
        type: 1,
      });
      expect(showSuccessToast).toHaveBeenCalledWith('Transaction added successfully');
    });
  });

  it('handles form submission failure', async () => {
    (postTransaction as jest.Mock).mockRejectedValue({
      response: {
        data: {
          errors: [{ message: 'Failed to add transaction' }],
        },
      },
    });
    render(<AddTransaction />);

    const productCodeInput = screen.getByTestId('product-code-input');
    const quantityInput = screen.getByTestId('quantity-input');
    const transactionTypeSelect = screen.getByTestId('transaction-type-select');
    const submitButton = screen.getByTestId('add-transaction-button');

    fireEvent.change(productCodeInput, { target: { value: 'ABC123' } });
    fireEvent.change(quantityInput, { target: { value: '10' } });
    fireEvent.change(transactionTypeSelect, { target: { value: '1' } });

    fireEvent.click(submitButton);

    await waitFor(() => {
      expect(postTransaction).toHaveBeenCalledWith({
        productCode: 'ABC123',
        quantity: 10,
        type: 1,
      });
      expect(showErrorToast).toHaveBeenCalledWith('Failed to add transaction');
    });
  });
});
