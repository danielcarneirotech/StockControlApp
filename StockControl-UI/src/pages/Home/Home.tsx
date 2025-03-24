import { useState } from 'react';
import { User } from 'react-feather';
import { AddTransaction } from '../../components/AddTransacation/AddTransaction';
import Products from '../../components/Products/Products';
import StockReport from '../../components/StockReport/StockReport';
import './Home.css';

const TAB_NAMES = {
  ADD_TRANSACTION: 'addTransaction',
  STOCK_REPORT: 'stockReport',
  PRODUCTS: 'products',
};

const TABS = [
  {
    name: TAB_NAMES.PRODUCTS,
    testId: 'products-tab',
    component: Products,
    text: 'Products',
  },
  {
    name: TAB_NAMES.ADD_TRANSACTION,
    testId: 'add-transaction-tab',
    component: AddTransaction,
    text: 'Add Transaction',
  },
  {
    name: TAB_NAMES.STOCK_REPORT,
    testId: 'stock-report-tab',
    component: StockReport,
    text: 'Stock Report',
  },
];

export function Home() {
  const [activeTab, setActiveTab] = useState(TAB_NAMES.PRODUCTS);

  const ActiveComponent = TABS.find((tab) => tab.name === activeTab)?.component || AddTransaction;

  return (
    <div data-testid="home-page" className="page">
      <header data-testid="home-header">
        <h1 data-testid="home-header-title">Fitshop Stock System</h1>
        <div data-testid="nav-container" className="nav-container">
          {TABS.map((tab) => (
            <div
              key={tab.name}
              data-testid={tab.testId}
              onClick={() => setActiveTab(tab.name)}
              className={`nav-item ${activeTab === tab.name && 'active'}`}
            >
              {tab.text}
            </div>
          ))}
        </div>
      </header>
      <main>
        <ActiveComponent />
      </main>
      <footer className="text-center">
        <User />
        <p>Daniel Carneiro | 2025</p>
      </footer>
    </div>
  );
}
