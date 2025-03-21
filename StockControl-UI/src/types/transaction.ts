export enum TransactionType {
  CheckIn,
  CheckOut,
}

export interface Transaction {
  id: string;
  productCode: string;
  quantity: number;
  type: TransactionType;
  date: Date;
}

export interface AddTransactionPayload {
  productCode: string;
  type: TransactionType;
  quantity: number;
}
