import { useState } from 'react';
import { Card } from '../Card/Card';
import Form from '../Form/Form';
import { Input } from '../Input/Input';
import { Select } from '../Select/Select';

import { postTransaction } from '../../services/TransactionService/transactionService';
import { AddTransactionPayload, TransactionType } from '../../types/transaction';
import Button from '../Button/Button';

import LoadingIcon from '../LoadingIcon/LoadingIcon';
import { showErrorToast, showSuccessToast } from '../../services/ToastService/toastService';

export function AddTransaction() {
  const initialTransactionState = {
    productCode: '',
    quantity: 0,
    type: TransactionType.CheckIn,
  };
  const [transaction, setTransaction] = useState(initialTransactionState);

  const [addTransactionIsLoading, setAddTransactionIsLoading] = useState(false);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setTransaction((prevTransaction) => ({
      ...prevTransaction,
      [name]: name === 'quantity' ? Number(value) : value,
    }));
  };

  const transactionTypes = [
    { label: 'Check In', value: TransactionType.CheckIn.toString() },
    { label: 'Check Out', value: TransactionType.CheckOut.toString() },
  ];

  function handleSelectChange(value: string) {
    setTransaction((prevTransaction) => ({
      ...prevTransaction,
      type: Number(value),
    }));
  }

  async function handleOnSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const transactionData = {
      productCode: transaction.productCode,
      quantity: transaction.quantity,
      type: transaction.type,
    };

    addTransaction(transactionData);
  }

  async function addTransaction(transactionData: AddTransactionPayload) {
    setAddTransactionIsLoading(true);
    await postTransaction(transactionData)
      .then(() => {
        addTransactionSucceeded();
      })
      .catch((error) => {
        addTransactionFailed(error);
      })
      .finally(() => {
        setAddTransactionIsLoading(false);
      });
  }

  function addTransactionSucceeded() {
    showSuccessToast('Transaction added successfully');
    resetForm();
  }

  function addTransactionFailed(error: { response?: { data: string } }) {
    showErrorToast(error.response?.data || 'Failed to add transaction.');
  }

  function resetForm() {
    setTransaction(initialTransactionState);
  }

  return (
    <>
      <Card dataTestId="add-transaction-card-container">
        <Card.Header>
          <h1>Add Transaction</h1>
          <p>View stock levels for products on a specific date</p>
        </Card.Header>
        <Card.Body>
          <Form onSubmit={handleOnSubmit}>
            <Form.FormGroup>
              <label htmlFor="productCode">Product Code:</label>
              <Input
                data-testid="product-code-input"
                name="productCode"
                value={transaction.productCode}
                onChange={handleInputChange}
                type="text"
                id="productCode"
                className="form-control"
                placeholder="Enter product code"
                required
              />
            </Form.FormGroup>
            <Form.FormGroup>
              <label htmlFor="quantity">Quantity:</label>
              <Input
                data-testid="quantity-input"
                min={1}
                max={200000}
                name="quantity"
                value={transaction.quantity}
                onChange={handleInputChange}
                type="number"
                id="quantity"
                className="form-control"
                placeholder="Enter quantity"
                required
              />
            </Form.FormGroup>
            <Form.FormGroup>
              <label htmlFor="transactionType">Transaction Type:</label>
              <Select
                id="transactionType"
                name="transactionType"
                dataTestId="transaction-type-select"
                options={transactionTypes}
                value={transaction.type.toString()}
                onChange={handleSelectChange}
                required
              ></Select>
            </Form.FormGroup>
            <Button
              data-testid="add-transaction-button"
              disabled={addTransactionIsLoading}
              className="primary"
              type="submit"
            >
              {addTransactionIsLoading ? <LoadingIcon /> : 'Add Transaction'}
            </Button>
          </Form>
        </Card.Body>
      </Card>
    </>
  );
}
