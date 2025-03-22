import { User } from 'react-feather';
import { AddTransaction } from '../../components/AddTransacation/AddTransaction';
import StockReport from '../../components/StockReport/StockReport';
import { useState } from 'react';

const TABS = {
  ADD_TRANSACTION: 'addTransaction',
  STOCK_REPORT: 'stockReport',
};

export function Home() {
  const [activeTab, setActiveTab] = useState(TABS.ADD_TRANSACTION);
  return (
    <div data-testid="home-page" className="page">
      <header data-testid="home-header">
        <h1 data-testid="home-header-title">Fitshop Stock System</h1>
        <div data-testid="nav-container" className="nav-container">
          <div
            data-testid="add-transaction-tab"
            onClick={() => setActiveTab(TABS.ADD_TRANSACTION)}
            className={`nav-item ${activeTab === TABS.ADD_TRANSACTION && 'active'}`}
          >
            Add Transaction
          </div>
          <div
            data-testid="stock-report-tab"
            onClick={() => setActiveTab(TABS.STOCK_REPORT)}
            className={`nav-item ${activeTab === TABS.STOCK_REPORT && 'active'}`}
          >
            Stock Report
          </div>
        </div>
      </header>
      <main>{TABS.ADD_TRANSACTION === activeTab ? <AddTransaction /> : <StockReport />}</main>
      <footer className="text-center">
        <User />
        <p>Daniel Carneiro | 2025</p>
      </footer>
    </div>
  );
}
