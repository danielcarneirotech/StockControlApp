import { AddTransactionPayload } from '../../types/transaction';
import api from '../api';

export const postTransaction = async (transaction: AddTransactionPayload) => {
  const response = await api.post('/transaction', transaction);
  return response.data;
};
