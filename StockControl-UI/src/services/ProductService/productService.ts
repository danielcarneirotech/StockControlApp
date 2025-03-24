import { ProductToAdd } from '../../types/product';
import api from '../api';

export const getProducts = async () => {
  const response = await api.get('/products');
  return response.data;
};

export const postProduct = async (product: ProductToAdd) => {
  const response = await api.post('/product', product);
  return response.data;
};
