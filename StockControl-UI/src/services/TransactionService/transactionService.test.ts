import { postTransaction } from "./transactionService.ts";
import api from "../api";
import {
  AddTransactionPayload,
  TransactionType,
} from "../../types/transaction";

jest.mock("../ReportService/reportService");
jest.mock("../ToastService/toastService");
jest.mock("../api", () => ({
  __esModule: true,
  default: {
    post: jest.fn(),
    get: jest.fn(),
  },
}));

describe("postTransaction", () => {
  it("should post a transaction and return the response data", async () => {
    const mockTransaction: AddTransactionPayload = {
      productCode: "P001",
      type: TransactionType.CheckIn,
      quantity: 10,
    };

    const mockResponse = { data: { success: true } };
    (api.post as jest.Mock).mockResolvedValue(mockResponse);

    const result = await postTransaction(mockTransaction);

    expect(api.post).toHaveBeenCalledWith("/transaction", mockTransaction);
    expect(result).toEqual(mockResponse.data);
  });

  it("should handle errors when posting a transaction", async () => {
    const mockTransaction: AddTransactionPayload = {
      productCode: "P002",
      type: TransactionType.CheckOut,
      quantity: 5,
    };

    const mockError = new Error("Network error");
    (api.post as jest.Mock).mockRejectedValue(mockError);

    await expect(postTransaction(mockTransaction)).rejects.toThrow(
      "Network error"
    );
  });

  it("should post a CheckIn transaction and return the response data", async () => {
    const mockTransaction: AddTransactionPayload = {
      productCode: "P003",
      type: TransactionType.CheckIn,
      quantity: 20,
    };

    const mockResponse = { data: { success: true } };
    (api.post as jest.Mock).mockResolvedValue(mockResponse);

    const result = await postTransaction(mockTransaction);

    expect(api.post).toHaveBeenCalledWith("/transaction", mockTransaction);
    expect(result).toEqual(mockResponse.data);
  });

  it("should post a CheckOut transaction and return the response data", async () => {
    const mockTransaction: AddTransactionPayload = {
      productCode: "P004",
      type: TransactionType.CheckOut,
      quantity: 15,
    };

    const mockResponse = { data: { success: true } };
    (api.post as jest.Mock).mockResolvedValue(mockResponse);

    const result = await postTransaction(mockTransaction);

    expect(api.post).toHaveBeenCalledWith("/transaction", mockTransaction);
    expect(result).toEqual(mockResponse.data);
  });

  it("should handle validation errors when posting a transaction", async () => {
    const mockTransaction: AddTransactionPayload = {
      productCode: "",
      type: TransactionType.CheckIn,
      quantity: 0,
    };

    const mockError = new Error("Validation error");
    (api.post as jest.Mock).mockRejectedValue(mockError);

    await expect(postTransaction(mockTransaction)).rejects.toThrow(
      "Validation error"
    );
  });
});
