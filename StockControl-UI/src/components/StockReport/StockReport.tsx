import { format } from 'date-fns';
import { useState } from 'react';
import { getReport } from '../../services/ReportService/reportService';
import { showErrorToast, showSuccessToast } from '../../services/ToastService/toastService';
import { GetReportPayload, GetReportResponse, ReportItem } from '../../types/report';
import Button from '../Button/Button';
import { Card } from '../Card/Card';
import { Form } from '../Form/Form';
import { Input } from '../Input/Input';
import LoadingIcon from '../LoadingIcon/LoadingIcon';
import Table from '../Table/Table';
import './StockReport.css';

const columns: { header: string; accessor: keyof ReportItem }[] = [
  { header: 'Product Name', accessor: 'productName' },
  { header: 'Product Code', accessor: 'productCode' },
  { header: 'Check-in', accessor: 'checkinQuantity' },
  { header: 'Check-out', accessor: 'checkoutQuantity' },
  { header: 'Balance', accessor: 'balance' },
];

function StockReport() {
  const initialReportParamsState = {
    reportDate: format(new Date(), 'yyyy-MM-dd'),
    productCode: '',
  };

  const [reportParams, setReportParams] = useState<GetReportPayload>(initialReportParamsState);

  const [isGetReportLoading, setIsGetReportLoading] = useState<boolean>(false);
  const [reportItems, setReportItems] = useState<ReportItem[]>([]);
  const [hasGenerated, setHasGenerated] = useState<boolean>(false);

  function handleInputChange(event: React.ChangeEvent<HTMLInputElement>) {
    const { id, value } = event.target as HTMLInputElement;
    setReportParams((prevState) => ({
      ...prevState,
      [id]: value,
    }));
  }

  const handleFormSubmit = (event: React.FormEvent) => {
    event.preventDefault();
    getReportItems();
  };

  async function getReportItems() {
    setIsGetReportLoading(true);
    await getReport(reportParams)
      .then((response) => {
        getReportSucceeded(response);
      })
      .catch((error) => {
        getReportFailed(error);
      })
      .finally(() => {
        setIsGetReportLoading(false);
      });
  }

  function getReportSucceeded(response: GetReportResponse) {
    showSuccessToast('Report generated successfully');
    setReportItems(response.$values);
    setHasGenerated(true);
  }

  function getReportFailed(error: { response?: { data: string } }) {
    showErrorToast(error.response?.data || 'Failed to generate report');
    setReportItems([]);
    setHasGenerated(false);
  }

  return (
    <>
      <Card dataTestId="stock-report-card">
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
                data-testid="transaction-date-input"
                max={format(new Date(), 'yyyy-MM-dd')}
                min="2000-01-01"
                type="date"
                id="reportDate"
                className="form-control"
                value={reportParams.reportDate}
                onChange={handleInputChange}
                required
              />
            </Form.FormGroup>
            <Form.FormGroup>
              <label htmlFor="productCode" className="form-label">
                Product Code (Optional)
              </label>
              <Input
                data-testid="product-code-input"
                type="text"
                id="productCode"
                className="form-control"
                value={reportParams.productCode}
                onChange={handleInputChange}
                placeholder="Filter by product code"
              />
            </Form.FormGroup>
            <Button
              data-testid="generate-report-button"
              disabled={isGetReportLoading}
              type="submit"
              className="primary"
            >
              {isGetReportLoading ? <LoadingIcon /> : 'Generate Report'}
            </Button>
          </Form>
          {hasGenerated && (
            <Table
              dataTestId="stock-report-table"
              className="stock-report-table"
              columns={columns}
              data={reportItems}
            />
          )}
        </Card.Body>
      </Card>
    </>
  );
}

export default StockReport;
