import { ProductToAdd } from '../../types/product';
import api from '../api';
import { getProducts, postProduct } from './productService';

jest.mock('../api', () => ({
  __esModule: true,
  default: {
    get: jest.fn(),
    post: jest.fn(),
  },
}));

describe('ProductService', () => {
  describe('getProducts', () => {
    it('should fetch products and return the response data', async () => {
      const mockResponse = {
        data: [
          { id: 1, name: 'Product 1' },
          { id: 2, name: 'Product 2' },
        ],
      };

      (api.get as jest.Mock).mockResolvedValue(mockResponse);

      const result = await getProducts();

      expect(api.get).toHaveBeenCalledWith('/products');
      expect(result).toEqual(mockResponse.data);
    });

    it('should handle errors when fetching products', async () => {
      const mockError = new Error('Network error');
      (api.get as jest.Mock).mockRejectedValue(mockError);

      await expect(getProducts()).rejects.toThrow('Network error');
    });
  });

  describe('postProduct', () => {
    it('should post a product and return the response data', async () => {
      const mockProduct: ProductToAdd = {
        name: 'New Product',
        code: 'NP001',
      };

      const mockResponse = {
        data: { id: 1, ...mockProduct },
      };

      (api.post as jest.Mock).mockResolvedValue(mockResponse);

      const result = await postProduct(mockProduct);

      expect(api.post).toHaveBeenCalledWith('/product', mockProduct);
      expect(result).toEqual(mockResponse.data);
    });

    it('should handle errors when posting a product', async () => {
      const mockProduct: ProductToAdd = {
        name: 'New Product',
        code: 'NP001',
      };

      const mockError = new Error('Network error');
      (api.post as jest.Mock).mockRejectedValue(mockError);

      await expect(postProduct(mockProduct)).rejects.toThrow('Network error');
    });
  });
});
