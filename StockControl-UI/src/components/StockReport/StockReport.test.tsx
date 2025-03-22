import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import StockReport from "./StockReport";
import { getReport } from "../../services/ReportService/reportService";
import {
  showErrorToast,
  showSuccessToast,
} from "../../services/ToastService/toastService";

jest.mock("../../services/reportService/reportService");
jest.mock("../../services/ToastService/toastService");
jest.mock("../../services/api", () => ({
  __esModule: true,
  default: {
    post: jest.fn(),
    get: jest.fn(),
  },
}));

describe("StockReport Component", () => {
  const setup = () => {
    render(<StockReport />);
  };

  beforeEach(() => {
    jest.clearAllMocks();
  });

  test("renders StockReport component", () => {
    setup();
    expect(screen.getByTestId("stock-report-card")).toBeInTheDocument();
  });

  test("handles input changes", () => {
    setup();
    const transactionDateInput = screen.getByTestId("transaction-date-input");
    const productCodeInput = screen.getByTestId("product-code-input");

    fireEvent.change(transactionDateInput, { target: { value: "2023-10-01" } });
    fireEvent.change(productCodeInput, { target: { value: "P123" } });

    expect(transactionDateInput).toHaveValue("2023-10-01");
    expect(productCodeInput).toHaveValue("P123");
  });

  test("handles form submission successfully", async () => {
    (getReport as jest.Mock).mockResolvedValueOnce({
      $values: [
        {
          productName: "Product 1",
          productCode: "P123",
          checkinQuantity: 10,
          checkoutQuantity: 5,
          balance: 5,
        },
      ],
    });
    setup();

    const transactionDateInput = screen.getByTestId("transaction-date-input");
    const productCodeInput = screen.getByTestId("product-code-input");
    const submitButton = screen.getByTestId("generate-report-button");

    fireEvent.change(transactionDateInput, { target: { value: "2023-10-01" } });
    fireEvent.change(productCodeInput, { target: { value: "P123" } });
    fireEvent.click(submitButton);

    await waitFor(() => {
      expect(getReport).toHaveBeenCalledWith({
        reportDate: "2023-10-01",
        productCode: "P123",
      });
      expect(showSuccessToast).toHaveBeenCalledWith(
        "Report generated successfully"
      );
      expect(
        screen.getByTestId("table stock-report-table")
      ).toBeInTheDocument();
    });
  });

  test("handles form submission failure", async () => {
    (getReport as jest.Mock).mockRejectedValueOnce({
      response: { data: "Failed to generate report." },
    });
    setup();

    const transactionDateInput = screen.getByTestId("transaction-date-input");
    const productCodeInput = screen.getByTestId("product-code-input");
    const submitButton = screen.getByTestId("generate-report-button");

    fireEvent.change(transactionDateInput, { target: { value: "2023-10-01" } });
    fireEvent.change(productCodeInput, { target: { value: "P123" } });
    fireEvent.click(submitButton);

    await waitFor(() => {
      expect(getReport).toHaveBeenCalledWith({
        reportDate: "2023-10-01",
        productCode: "P123",
      });
      expect(showErrorToast).toHaveBeenCalledWith("Failed to generate report.");
      expect(
        screen.queryByTestId("stock-report-table")
      ).not.toBeInTheDocument();
    });
  });
});
