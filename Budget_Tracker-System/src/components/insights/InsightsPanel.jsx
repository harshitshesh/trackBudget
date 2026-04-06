import React from 'react';
import { 
  TrendingUp, 
  TrendingDown, 
  Target, 
  Calendar, 
  AlertCircle,
  Zap,
  ArrowUpRight,
  ArrowDownRight
} from 'lucide-react';
import useStore from '../../store/useStore';
import { 
  getHighestSpendingCategory, 
  getAverageDailySpend, 
  getMonthComparison,
  formatCurrency 
} from '../../utils/helpers';
import Card from '../ui/Card';
import Badge from '../ui/Badge';
import './InsightsPanel.css';

/**
 * InsightsPanel component summarizing key observations and patterns
 * (Requirement: Insights Section #4)
 */
const InsightsPanel = () => {
  const { transactions } = useStore();
  
  const highestSpend = getHighestSpendingCategory(transactions);
  const avgDaily = getAverageDailySpend(transactions);
  const comparison = getMonthComparison(transactions);

  return (
    <div className="insights-panel">
      <div className="insights-header">
        <h2 className="insights-title">Financial Insights</h2>
        <p className="insights-subtitle">AI-driven observations based on your activity</p>
      </div>

      <div className="insights-grid">
        {/* Highest Spending Category Insight */}
        {highestSpend && (
          <Card className="insight-card highlight">
            <div className="insight-card__icon insight-card__icon--warning">
              <Zap size={24} />
            </div>
            <div className="insight-card__content">
              <span className="insight-card__label">Spending Hotspot</span>
              <h3 className="insight-card__title">
                {highestSpend.emoji} {highestSpend.name}
              </h3>
              <p className="insight-card__description">
                You've spent <strong>{formatCurrency(highestSpend.value)}</strong> on {highestSpend.name} this month, 
                making up <strong>{highestSpend.percentage}%</strong> of your total expenses.
              </p>
              <Badge type="warning" className="insight-badge">Action Required</Badge>
            </div>
          </Card>
        )}

        {/* Monthly Comparison Insight */}
        {comparison && (
          <Card className="insight-card">
            <div className="insight-card__icon insight-card__icon--primary">
              <Calendar size={24} />
            </div>
            <div className="insight-card__content">
              <span className="insight-card__label">Monthly Comparison</span>
              <h3 className="insight-card__title">
                vs. {comparison.previous.month}
              </h3>
              <div className="comparison-stats">
                <div className="stat-item">
                  <span className="stat-label">Income</span>
                  <div className={`stat-value ${comparison.incomeChange >= 0 ? 'pos' : 'neg'}`}>
                    {comparison.incomeChange >= 0 ? <ArrowUpRight size={16} /> : <ArrowDownRight size={16} />}
                    {Math.abs(comparison.incomeChange)}%
                  </div>
                </div>
                <div className="stat-item">
                  <span className="stat-label">Expenses</span>
                  <div className={`stat-value ${comparison.expenseChange <= 0 ? 'pos' : 'neg'}`}>
                    {comparison.expenseChange <= 0 ? <ArrowDownRight size={16} /> : <ArrowUpRight size={16} />}
                    {Math.abs(comparison.expenseChange)}%
                  </div>
                </div>
              </div>
              <p className="insight-card__description">
                {comparison.expenseChange > 0 
                  ? "Your expenses increased compared to last month. Watch your discretionary spending."
                  : "Excellent! You've reduced your spending by " + Math.abs(comparison.expenseChange) + "% this month."}
              </p>
            </div>
          </Card>
        )}

        {/* Average Daily Spend Insight */}
        <Card className="insight-card">
          <div className="insight-card__icon insight-card__icon--info">
            <TrendingUp size={24} />
          </div>
          <div className="insight-card__content">
            <span className="insight-card__label">Efficiency Metric</span>
            <h3 className="insight-card__title">
              {formatCurrency(avgDaily)}/day
            </h3>
            <p className="insight-card__description">
              On average, you are spending <strong>{formatCurrency(avgDaily)}</strong> every day. 
              Reducing this by just ₹200 could save you ₹6,000 monthly.
            </p>
            <Badge type="info" className="insight-badge">Tip of the day</Badge>
          </div>
        </Card>

        {/* Savings Observation */}
        <Card className="insight-card">
          <div className="insight-card__icon insight-card__icon--success">
            <Target size={24} />
          </div>
          <div className="insight-card__content">
            <span className="insight-card__label">Financial Goal</span>
            <h3 className="insight-card__title">Emergency Fund</h3>
            <p className="insight-card__description">
              Based on your current saving patterns, you'll reach your emergency fund goal of ₹2,00,000 in 
              <strong> 4 months</strong>. Keep it up!
            </p>
            <div className="progress-bar-mini">
              <div className="progress-fill" style={{ width: '65%' }} />
            </div>
          </div>
        </Card>
      </div>
    </div>
  );
};

export default InsightsPanel;
