import { toast } from "react-toastify";
import {
  showSuccessToast,
  showErrorToast,
  showInfoToast,
  showWarningToast,
} from "./toastService.ts";

jest.mock("react-toastify");

describe("toastService", () => {
  const message = "Test message";

  it("should show a success toast with default options", () => {
    showSuccessToast(message);
    expect(toast.success).toHaveBeenCalledWith(
      message,
      expect.objectContaining({
        position: "top-right",
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        style: {
          color: "#333",
        },
      })
    );
  });

  it("should show an error toast with default options", () => {
    showErrorToast(message);
    expect(toast.error).toHaveBeenCalledWith(
      message,
      expect.objectContaining({
        position: "top-right",
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        style: {
          color: "#333",
        },
      })
    );
  });

  it("should show an info toast with default options", () => {
    showInfoToast(message);
    expect(toast.info).toHaveBeenCalledWith(
      message,
      expect.objectContaining({
        position: "top-right",
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        style: {
          color: "#333",
        },
      })
    );
  });

  it("should show a warning toast with default options", () => {
    showWarningToast(message);
    expect(toast.warn).toHaveBeenCalledWith(
      message,
      expect.objectContaining({
        position: "top-right",
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        style: {
          color: "#333",
        },
      })
    );
  });
});
