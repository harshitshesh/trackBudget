import React, { useState, useEffect } from 'react';
import { Save, AlertCircle } from 'lucide-react';
import useStore from '../../store/useStore';
import { CATEGORIES } from '../../data/mockData';
import { generateId } from '../../utils/helpers';
import Modal from '../ui/Modal';
import Button from '../ui/Button';
import './TransactionForm.css';

const TransactionForm = ({ isOpen, onClose, initialData }) => {
  const { addTransaction, editTransaction } = useStore();

  // Form State
  const [formData, setFormData] = useState({
    description: '',
    amount: '',
    category: 'Food & Dining',
    type: 'expense',
    date: new Date().toISOString().split('T')[0], // Default today
  });

  const [errors, setErrors] = useState({});

  // Reset form when modal opens/closes or initialData changes
  useEffect(() => {
    if (initialData) {
      setFormData({
        ...initialData,
        amount: initialData.amount.toString(),
      });
    } else {
      setFormData({
        description: '',
        amount: '',
        category: 'Food & Dining',
        type: 'expense',
        date: new Date().toISOString().split('T')[0],
      });
    }
    setErrors({});
  }, [initialData, isOpen]);

  const validate = () => {
    const newErrors = {};
    if (!formData.description.trim()) newErrors.description = 'Description is required';
    if (!formData.amount || isNaN(formData.amount) || Number(formData.amount) <= 0) {
      newErrors.amount = 'Valid positive amount is required';
    }
    if (!formData.date) newErrors.date = 'Date is required';
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!validate()) return;

    const transactionData = {
      ...formData,
      amount: Number(formData.amount),
    };

    if (initialData) {
      editTransaction(initialData.id, transactionData);
    } else {
      addTransaction({
        ...transactionData,
        id: generateId(),
      });
    }

    onClose();
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    // Clear error for field when changed
    if (errors[name]) {
      setErrors((prev) => ({ ...prev, [name]: '' }));
    }
  };

  return (
    <Modal 
      isOpen={isOpen} 
      onClose={onClose} 
      title={initialData ? 'Edit Transaction' : 'Add New Transaction'}
    >
      <form className="transaction-form" onSubmit={handleSubmit}>
        {/* Description Field */}
        <div className="form-group">
          <label htmlFor="description">Description</label>
          <input
            type="text"
            id="description"
            name="description"
            value={formData.description}
            onChange={handleChange}
            placeholder="e.g., Grocery Shopping, Salary"
            className={errors.description ? 'input-error' : ''}
          />
          {errors.description && <span className="error-text">{errors.description}</span>}
        </div>

        <div className="form-row">
          {/* Amount Field */}
          <div className="form-group">
            <label htmlFor="amount">Amount (₹)</label>
            <input
              type="number"
              id="amount"
              name="amount"
              value={formData.amount}
              onChange={handleChange}
              placeholder="0.00"
              step="any"
              className={errors.amount ? 'input-error' : ''}
            />
            {errors.amount && <span className="error-text">{errors.amount}</span>}
          </div>

          {/* Date Field */}
          <div className="form-group">
            <label htmlFor="date">Date</label>
            <input
              type="date"
              id="date"
              name="date"
              value={formData.date}
              onChange={handleChange}
              className={errors.date ? 'input-error' : ''}
            />
            {errors.date && <span className="error-text">{errors.date}</span>}
          </div>
        </div>

        <div className="form-row">
          {/* Type Field */}
          <div className="form-group">
            <label htmlFor="type">Type</label>
            <select id="type" name="type" value={formData.type} onChange={handleChange}>
              <option value="expense">Expense</option>
              <option value="income">Income</option>
            </select>
          </div>

          {/* Category Field */}
          <div className="form-group">
            <label htmlFor="category">Category</label>
            <select id="category" name="category" value={formData.category} onChange={handleChange}>
              {Object.keys(CATEGORIES).map((cat) => (
                <option key={cat} value={cat}>
                  {CATEGORIES[cat].emoji} {cat}
                </option>
              ))}
            </select>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="form-actions">
          <Button variant="secondary" onClick={onClose} type="button">
            Cancel
          </Button>
          <Button variant="primary" type="submit" icon={Save}>
            {initialData ? 'Update Transaction' : 'Save Transaction'}
          </Button>
        </div>
      </form>
    </Modal>
  );
};

export default TransactionForm;
