// src/services/reportService.ts
import { GetReportPayload, GetReportResponse } from "../types/report";
import api from "./api";

export const getReport = async (reportPayload: GetReportPayload) => {
  const params = reportPayload;
  const response = await api.get("/stockreport", { params });
  return response.data as GetReportResponse;
};
