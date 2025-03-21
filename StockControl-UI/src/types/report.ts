export interface ReportItem {
  productName: string;
  productCode: string;
  checkinQuantity: number;
  checkoutQuantity: number;
  balance: number;
}

export interface GetReportPayload {
  reportDate: string;
  productCode?: string;
}

export interface GetReportResponse {
  $id: string;
  $values: ReportItem[];
}
