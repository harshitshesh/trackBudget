import React, { useEffect } from 'react';
import useStore from './store/useStore';
import Layout from './components/layout/Layout';
import SummaryCards from './components/dashboard/SummaryCards';
import BalanceTrend from './components/dashboard/BalanceTrend';
import SpendingBreakdown from './components/dashboard/SpendingBreakdown';
import TransactionList from './components/transactions/TransactionList';
import InsightsPanel from './components/insights/InsightsPanel';
import './App.css';
 
function App() {
  const { activePage, theme } = useStore();

  useEffect(() => {
    document.documentElement.setAttribute('data-theme', theme);
  }, [theme]);

  const renderPage = () => {
    switch (activePage) {
      case 'dashboard':
        return (
          <>
            <SummaryCards />
            <div className="dashboard-grid">
              <BalanceTrend />
              <SpendingBreakdown />
            </div>
          </>
        );
      case 'transactions':
        return <TransactionList />;
      case 'insights':
        return <InsightsPanel />;
      default:
        return (
          <div className="placeholder-page">
            <h2>{activePage.toUpperCase()} Section</h2>
            <p>Coming soon.</p>
          </div>
        );
    }
  };

  return (
    <Layout>
      {renderPage()}
    </Layout>
  );
}

export default App;
