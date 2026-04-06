import React, { useState, useMemo } from 'react';
import { Plus, Download, FileJson, FileSpreadsheet } from 'lucide-react';
import useStore from '../../store/useStore';
import { 
  filterTransactions, 
  sortTransactions, 
  exportToCSV, 
  exportToJSON 
} from '../../utils/helpers';
import Card from '../ui/Card';
import Button from '../ui/Button';
import EmptyState from '../ui/EmptyState';
import TransactionRow from './TransactionRow';
import TransactionFilters from './TransactionFilters';
import TransactionForm from './TransactionForm';
import './TransactionList.css';

/**
 * TransactionList component displaying a sortable/filterable table of transactions
 */
const TransactionList = () => {
  const { 
    transactions, 
    filters, 
    role, 
    deleteTransaction 
  } = useStore();

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingTransaction, setEditingTransaction] = useState(null);

  // Apply filtering and sorting to transactions
  const processedTransactions = useMemo(() => {
    let result = filterTransactions(transactions, filters);
    result = sortTransactions(result, filters.sortField, filters.sortOrder);
    return result;
  }, [transactions, filters]);

  const handleAddClick = () => {
    setEditingTransaction(null);
    setIsModalOpen(true);
  };

  const handleEditClick = (transaction) => {
    setEditingTransaction(transaction);
    setIsModalOpen(true);
  };

  const handleDeleteClick = (id) => {
    if (window.confirm('Are you sure you want to delete this transaction?')) {
      deleteTransaction(id);
    }
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setEditingTransaction(null);
  };

  return (
    <div className="transaction-list-page">
      {/* Header Actions */}
      <div className="page-header">
        <div className="page-header__text">
          <h2 className="page-header__title">Transactions</h2>
          <p className="page-header__subtitle">
            Showing {processedTransactions.length} of {transactions.length} total activities
          </p>
        </div>
        
        <div className="page-header__actions">
          {/* Export Actions (Optional Requirement) */}
          <div className="export-btns">
            <Button 
                variant="outline" 
                size="sm" 
                onClick={() => exportToCSV(processedTransactions)}
                icon={FileSpreadsheet}
                disabled={processedTransactions.length === 0}
            >
                Export CSV
            </Button>
            <Button 
                variant="outline" 
                size="sm" 
                onClick={() => exportToJSON(processedTransactions)}
                icon={FileJson}
                disabled={processedTransactions.length === 0}
            >
                Export JSON
            </Button>
          </div>

          {/* Add Action (Admin Only - Requirement #3) */}
          {role === 'admin' && (
            <Button 
              variant="primary" 
              size="md" 
              onClick={handleAddClick}
              icon={Plus}
            >
              Add Transaction
            </Button>
          )}
        </div>
      </div>

      {/* Filter Toolbar */}
      <TransactionFilters />

      {/* Transaction Table Card */}
      <Card className="transaction-table-card" hoverable={false}>
        {processedTransactions.length > 0 ? (
          <div className="table-wrapper">
            <table className="transaction-table">
              <thead>
                <tr>
                  <th className="col-date">Date</th>
                  <th className="col-desc">Description</th>
                  <th className="col-cat">Category</th>
                  <th className="col-amt">Amount</th>
                  <th className="col-actions">Actions</th>
                </tr>
              </thead>
              <tbody>
                {processedTransactions.map((t) => (
                  <TransactionRow 
                    key={t.id} 
                    transaction={t} 
                    role={role}
                    onEdit={handleEditClick}
                    onDelete={handleDeleteClick}
                  />
                ))}
              </tbody>
            </table>
          </div>
        ) : (
          <EmptyState 
            title="No transactions found" 
            description="Try adjusting your filters or search terms to find what you're looking for."
            action={
              role === 'admin' && (
                <Button variant="primary" onClick={handleAddClick}>
                  Add New Transaction
                </Button>
              )
            }
          />
        )}
      </Card>

      {/* Add/Edit Modal (Admin Only) */}
      {role === 'admin' && (
        <TransactionForm 
          isOpen={isModalOpen} 
          onClose={handleCloseModal} 
          initialData={editingTransaction}
        />
      )}
    </div>
  );
};

export default TransactionList;
