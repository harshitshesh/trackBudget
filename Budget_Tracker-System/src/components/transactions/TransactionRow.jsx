import React from 'react';
import { Edit2, Trash2, ArrowUpRight, ArrowDownLeft } from 'lucide-react';
import { CATEGORIES } from '../../data/mockData';
import { formatCurrency, formatDate } from '../../utils/helpers';
import Badge from '../ui/Badge';
import Button from '../ui/Button';
import './TransactionRow.css';


const TransactionRow = ({ transaction, role, onEdit, onDelete }) => {
  const category = CATEGORIES[transaction.category] || { emoji: '❓', color: '#64748b' };
  const isIncome = transaction.type === 'income';

  return (
    <tr className="transaction-row">
      {/* Date Column */}
      <td className="transaction-row__date">
        {formatDate(transaction.date)}
      </td>

      {/* Description Column */}
      <td className="transaction-row__description">
        <div className="description-wrapper">
          <div className={`type-icon type-icon--${transaction.type}`}>
            {isIncome ? <ArrowUpRight size={14} /> : <ArrowDownLeft size={14} />}
          </div>
          <span>{transaction.description}</span>
        </div>
      </td>

      {/* Category Column */}
      <td className="transaction-row__category">
        <Badge 
          type="neutral" 
          style={{ 
            backgroundColor: `${category.color}15`, 
            color: category.color,
            borderColor: `${category.color}30` 
          }}
        >
          <span className="category-emoji">{category.emoji}</span>
          {transaction.category}
        </Badge>
      </td>

      {/* Amount Column */}
      <td className={`transaction-row__amount ${isIncome ? 'amount--income' : 'amount--expense'}`}>
        {isIncome ? '+' : '-'}{formatCurrency(transaction.amount)}
      </td>

      {/* Actions Column (RBAC Requirement #3) */}
      <td className="transaction-row__actions">
        {role === 'admin' ? (
          <div className="actions-wrapper">
            <Button 
              variant="ghost" 
              size="sm" 
              onClick={() => onEdit(transaction)}
              title="Edit Transaction"
              className="btn-action--edit"
            >
              <Edit2 size={16} />
            </Button>
            <Button 
              variant="ghost" 
              size="sm" 
              onClick={() => onDelete(transaction.id)}
              title="Delete Transaction"
              className="btn-action--delete"
            >
              <Trash2 size={16} />
            </Button>
          </div>
        ) : (
          <span className="text-muted">View Only</span>
        )}
      </td>
    </tr>
  );
};

export default TransactionRow;
