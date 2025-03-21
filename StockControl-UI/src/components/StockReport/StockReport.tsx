import "./StockReport.css";
import { Product, StockReportItem, StockTransaction } from "../../types/types";
import { format } from "date-fns";
import { useState } from "react";
import { Card } from "../Card/Card";
import { Form } from "../Form/Form";
import { Input } from "../Input/Input";
import Button from "../Button/Button";
import Table from "../Table/Table";

interface StockReportProps {
  products: Product[];
  transactions: StockTransaction[];
}

const columns: { header: string; accessor: keyof StockReportItem }[] = [
  { header: "Product Name", accessor: "productName" },
  { header: "Product Code", accessor: "productCode" },
  { header: "Check-in Quantity", accessor: "checkInQuantity" },
  { header: "Check-out Quantity", accessor: "checkOutQuantity" },
  { header: "Balance", accessor: "balance" },
];

function StockReport() {
  const [products] = useState<Product[]>([
    { id: "P001", name: "Laptop", code: "LAP001" },
    { id: "P002", name: "Smartphone", code: "PHN001" },
    { id: "P003", name: "Headphones", code: "AUD001" },
    { id: "P004", name: "Monitor", code: "DSP001" },
    { id: "P005", name: "Keyboard", code: "INP001" },
  ]);

  const [transactions, setTransactions] = useState<StockTransaction[]>([
    {
      id: "T001",
      productCode: "LAP001",
      quantity: 10,
      type: "Check-in",
      date: new Date("2024-03-15"),
    },
    {
      id: "T002",
      productCode: "PHN001",
      quantity: 20,
      type: "Check-in",
      date: new Date("2024-03-16"),
    },
    {
      id: "T003",
      productCode: "LAP001",
      quantity: 3,
      type: "Check-out",
      date: new Date("2024-03-17"),
    },
  ]);

  const [reportDate, setReportDate] = useState<string>(
    format(new Date(), "yyyy-MM-dd")
  );
  const [filterProductCode, setFilterProductCode] = useState<string>("");
  const [reportItems, setReportItems] = useState<StockReportItem[]>([]);
  const [hasGenerated, setHasGenerated] = useState<boolean>(false);

  const handleFormSubmit = (event: React.FormEvent) => {
    event.preventDefault();
    generateReport();
  };

  const generateReport = () => {
    if (!reportDate) return;

    const selectedDate = new Date(reportDate);
    selectedDate.setHours(23, 59, 59, 999);

    const relevantTransactions = transactions.filter(
      (transaction) => transaction.date <= selectedDate
    );

    const filteredProducts = filterProductCode
      ? products.filter((product) => product.code.includes(filterProductCode))
      : products;

    const items: StockReportItem[] = filteredProducts.map((product) => {
      const productTransactions = relevantTransactions.filter(
        (transaction) => transaction.productCode === product.code
      );

      const checkInQuantity = productTransactions
        .filter((t) => t.type === "Check-in")
        .reduce((sum, t) => sum + t.quantity, 0);

      const checkOutQuantity = productTransactions
        .filter((t) => t.type === "Check-out")
        .reduce((sum, t) => sum + t.quantity, 0);

      return {
        productName: product.name,
        productCode: product.code,
        checkInQuantity,
        checkOutQuantity,
        balance: checkInQuantity - checkOutQuantity,
      };
    });

    setReportItems(items);
    setHasGenerated(true);
  };

  return (
    <>
      <Card>
        <Card.Header>
          <h1>Stock Report</h1>
          <p>View stock levels for products on a specific date</p>
        </Card.Header>
        <Card.Body>
          <Form onSubmit={handleFormSubmit}>
            <Form.FormGroup>
              <label htmlFor="transactionDate" className="form-label">
                Transaction Date
              </label>
              <Input
                type="date"
                id="transactionDate"
                className="form-control"
                value={reportDate}
                onChange={(e) => setReportDate(e.target.value)}
                required
              />
            </Form.FormGroup>
            <Form.FormGroup>
              <label htmlFor="productCode" className="form-label">
                Product Code (Optional)
              </label>
              <Input
                type="text"
                id="productCode"
                className="form-control"
                value={filterProductCode}
                onChange={(e) => setFilterProductCode(e.target.value)}
                placeholder="Filter by product code"
              />
            </Form.FormGroup>
            <Button type="submit" className="primary">
              Generate Report
            </Button>
          </Form>
          {hasGenerated && <Table columns={columns} data={reportItems} />}
        </Card.Body>
      </Card>
    </>
  );
}

export default StockReport;
