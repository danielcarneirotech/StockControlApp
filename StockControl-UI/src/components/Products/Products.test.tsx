import { fireEvent, render, screen, waitFor } from '@testing-library/react';
import { getProducts, postProduct } from '../../services/ProductService/productService';
import { showSuccessToast } from '../../services/ToastService/toastService';
import { handleError } from '../../utils/utils';
import Products from './Products';

jest.mock('../../services/ProductService/productService');
jest.mock('../../services/ToastService/toastService');
jest.mock('../../utils/utils');
jest.mock('../../services/api', () => ({
  __esModule: true,
  default: {
    post: jest.fn(),
    get: jest.fn(),
  },
}));

describe('Products', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('renders the Products component', async () => {
    (getProducts as jest.Mock).mockResolvedValue({ data: { $values: [] } });
    render(<Products />);
    await waitFor(() => {
      expect(screen.getByTestId('product-card')).toBeInTheDocument();
      expect(screen.getByText('Products')).toBeInTheDocument();
      expect(screen.getByText('Add and list products on the system')).toBeInTheDocument();
      expect(screen.getByTestId('product-name-input')).toBeInTheDocument();
      expect(screen.getByTestId('product-code-input')).toBeInTheDocument();
      expect(screen.getByTestId('add-product-button')).toBeInTheDocument();
      expect(screen.getByTestId('no-data-row')).toBeInTheDocument();
    });
  });

  it('handles input changes', async () => {
    (getProducts as jest.Mock).mockResolvedValue({ data: { $values: [] } });
    render(<Products />);
    await waitFor(() => {
      const productNameInput = screen.getByTestId('product-name-input');
      const productCodeInput = screen.getByTestId('product-code-input');

      fireEvent.change(productNameInput, { target: { value: 'Product A' } });
      fireEvent.change(productCodeInput, { target: { value: 'CODE123' } });

      expect(productNameInput).toHaveValue('Product A');
      expect(productCodeInput).toHaveValue('CODE123');
    });
  });

  it('handles form submission successfully', async () => {
    (getProducts as jest.Mock).mockResolvedValue({ data: { $values: [] } });
    (postProduct as jest.Mock).mockResolvedValue({});
    render(<Products />);

    const productNameInput = screen.getByTestId('product-name-input');
    const productCodeInput = screen.getByTestId('product-code-input');
    const submitButton = screen.getByTestId('add-product-button');

    fireEvent.change(productNameInput, { target: { value: 'Product A' } });
    fireEvent.change(productCodeInput, { target: { value: 'CODE123' } });

    fireEvent.click(submitButton);

    await waitFor(() => {
      expect(postProduct).toHaveBeenCalledWith({ name: 'Product A', code: 'CODE123' });
      expect(showSuccessToast).toHaveBeenCalledWith('Product added successfully');
    });
  });

  it('handles form submission failure', async () => {
    (getProducts as jest.Mock).mockResolvedValue({ data: { $values: [] } });
    (postProduct as jest.Mock).mockRejectedValue(new Error('Failed to add product'));
    render(<Products />);

    const productNameInput = screen.getByTestId('product-name-input');
    const productCodeInput = screen.getByTestId('product-code-input');
    const submitButton = screen.getByTestId('add-product-button');

    fireEvent.change(productNameInput, { target: { value: 'Product A' } });
    fireEvent.change(productCodeInput, { target: { value: 'CODE123' } });

    fireEvent.click(submitButton);

    await waitFor(() => {
      expect(postProduct).toHaveBeenCalledWith({ name: 'Product A', code: 'CODE123' });
      expect(handleError).toHaveBeenCalledWith(expect.any(Error), 'Failed to add product');
    });
  });

  it('loads products on mount', async () => {
    const mockProducts = [{ name: 'Product A', code: 'CODE123' }];
    (getProducts as jest.Mock).mockResolvedValue({ data: { $values: mockProducts } });
    render(<Products />);

    await waitFor(() => {
      expect(getProducts).toHaveBeenCalled();
      expect(screen.getByText('Product A')).toBeInTheDocument();
      expect(screen.getByText('CODE123')).toBeInTheDocument();
    });
  });

  it('handles load products failure', async () => {
    (getProducts as jest.Mock).mockRejectedValue(new Error('Failed to load products'));
    render(<Products />);

    await waitFor(() => {
      expect(getProducts).toHaveBeenCalled();
      expect(handleError).toHaveBeenCalledWith(expect.any(Error), 'Failed to load products');
    });
  });
});
