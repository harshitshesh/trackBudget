import React from 'react';
import { 
  TrendingUp, 
  TrendingDown, 
  Wallet, 
  ArrowUpCircle, 
  ArrowDownCircle, 
  Percent 
} from 'lucide-react';
import useStore from '../../store/useStore';
import { 
  calculateTotalIncome, 
  calculateTotalExpenses, 
  calculateBalance, 
  calculateSavingsRate,
  formatCurrency 
} from '../../utils/helpers';
import Card from '../ui/Card';
import './SummaryCards.css';

/**
 * SummaryCards component displaying key financial metrics
 * (Total Balance, Income, Expenses, Savings Rate)
 */
const SummaryCards = () => {
  const { transactions } = useStore();

  // Calculate metrics using helper functions
  const totalIncome = calculateTotalIncome(transactions);
  const totalExpenses = calculateTotalExpenses(transactions);
  const balance = calculateBalance(transactions);
  const savingsRate = calculateSavingsRate(transactions);

  // Card data configuration for easy rendering
  const cards = [
    {
      title: 'Total Balance',
      value: formatCurrency(balance),
      icon: Wallet,
      type: 'primary',
      trend: '+2.5%',
      trendUp: true
    },
    {
      title: 'Total Income',
      value: formatCurrency(totalIncome),
      icon: ArrowUpCircle,
      type: 'income',
      trend: '+12%',
      trendUp: true
    },
    {
      title: 'Total Expenses',
      value: formatCurrency(totalExpenses),
      icon: ArrowDownCircle,
      type: 'expense',
      trend: '+4%',
      trendUp: false
    },
    {
      title: 'Savings Rate',
      value: `${savingsRate}%`,
      icon: Percent,
      type: 'warning',
      trend: '-1.2%',
      trendUp: false
    }
  ];

  return (
    <div className="summary-cards">
      {cards.map((card, index) => (
        <Card key={index} className={`summary-card summary-card--${card.type}`}>
          <div className="summary-card__header">
            <div className={`summary-card__icon-wrapper summary-card__icon-wrapper--${card.type}`}>
              <card.icon size={20} />
            </div>
            <div className={`summary-card__trend ${card.trendUp ? 'summary-card__trend--up' : 'summary-card__trend--down'}`}>
              {card.trendUp ? <TrendingUp size={14} /> : <TrendingDown size={14} />}
              <span>{card.trend}</span>
            </div>
          </div>
          <div className="summary-card__body">
            <span className="summary-card__title">{card.title}</span>
            <h2 className="summary-card__value">{card.value}</h2>
          </div>
        </Card>
      ))}
    </div>
  );
};

export default SummaryCards;
