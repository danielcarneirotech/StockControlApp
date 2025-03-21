import { useState } from "react";
import { Card } from "../Card/Card";
import Form from "../Form/Form";
import { Input } from "../Input/Input";
import { Select } from "../Select/Select";
import "./AddTransaction.css";
import Button from "../Button/Button";

enum TRANSACTION_TYPES {
  CHECK_IN = 0,
  CHECK_OUT = 1,
}

export function AddTransaction() {
  const transactionTypes = [
    { label: "Check In", value: TRANSACTION_TYPES.CHECK_IN.toString() },
    { label: "Check Out", value: TRANSACTION_TYPES.CHECK_OUT.toString() },
  ];
  const [selectedTransactionType, setSelectedTransactionType] = useState(
    TRANSACTION_TYPES.CHECK_IN.toString()
  );

  function handleSelectChange(value: string) {
    setSelectedTransactionType(value);
  }
  return (
    <>
      <Card>
        <Card.Header>
          <h1>Add Transaction</h1>
          <p>View stock levels for products on a specific date</p>
        </Card.Header>
        <Card.Body>
          <Form onSubmit={(e) => e.preventDefault()}>
            <Form.FormGroup>
              <label htmlFor="productCode">Product Code:</label>
              <Input
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
                options={transactionTypes}
                value={selectedTransactionType}
                onChange={handleSelectChange}
                required
              ></Select>
            </Form.FormGroup>
            <Button className="primary" type="submit">
              Add Transaction
            </Button>
          </Form>
        </Card.Body>
      </Card>
    </>
  );
}
