import StockReport from "./components/StockReport/StockReport";
import "./App.css";
import { useState } from "react";
import { AddTransaction } from "./components/AddTransacation/AddTransaction";
import { ToastContainer } from "react-toastify";

const TABS = {
  ADD_TRANSACTION: "addTransaction",
  STOCK_REPORT: "stockReport",
};

export function App() {
  const [activeTab, setActiveTab] = useState(TABS.ADD_TRANSACTION);
  return (
    <div className="page">
      <header>
        <h1>Fitshop Stock System</h1>
        <div className="nav-container">
          <div
            onClick={() => setActiveTab(TABS.ADD_TRANSACTION)}
            className={`nav-item ${
              activeTab === TABS.ADD_TRANSACTION && "active"
            }`}
          >
            Add Transaction
          </div>
          <div
            onClick={() => setActiveTab(TABS.STOCK_REPORT)}
            className={`nav-item ${
              activeTab === TABS.STOCK_REPORT && "active"
            }`}
          >
            Stock Report
          </div>
        </div>
      </header>
      <main>
        {TABS.ADD_TRANSACTION === activeTab ? (
          <AddTransaction />
        ) : (
          <StockReport />
        )}
      </main>
      <footer className="text-center">
        <p>&copy; 2025 Daniel Carneiro. All rights reserved.</p>
      </footer>
      <ToastContainer />
    </div>
  );
}
