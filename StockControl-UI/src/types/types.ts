export interface Product {
  id: string
  name: string
  code: string
}

export interface StockTransaction {
  id: string
  productCode: string
  quantity: number
  type: "Check-in" | "Check-out"
  date: Date
}

export interface StockReportItem {
  productName: string
  productCode: string
  checkInQuantity: number
  checkOutQuantity: number
  balance: number
}

