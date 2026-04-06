import React from 'react';
import { 
  AreaChart, 
  Area, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  ResponsiveContainer
} from 'recharts';
import useStore from '../../store/useStore';
import { getMonthlyData, formatCurrency } from '../../utils/helpers';
import Card from '../ui/Card';
import './BalanceTrend.css';

/**
 * BalanceTrend component displaying monthly balance trend using an AreaChart
 * (Requirement: At least one time-based visualization)
 */
const BalanceTrend = () => {
  const { transactions } = useStore();
  const data = getMonthlyData(transactions);

  // Custom tooltip for better UI integration
  const CustomTooltip = ({ active, payload, label }) => {
    if (active && payload && payload.length) {
      return (
        <div className="chart-tooltip">
          <p className="chart-tooltip__label">{label}</p>
          <div className="chart-tooltip__content">
            <div className="chart-tooltip__item">
              <span className="dot dot--income" />
              <span className="name">Income:</span>
              <span className="value">{formatCurrency(payload[0].payload.income)}</span>
            </div>
            <div className="chart-tooltip__item">
              <span className="dot dot--expense" />
              <span className="name">Expense:</span>
              <span className="value">{formatCurrency(payload[0].payload.expense)}</span>
            </div>
            <div className="chart-tooltip__divider" />
            <div className="chart-tooltip__item chart-tooltip__item--total">
              <span className="name">Net Balance:</span>
              <span className="value">{formatCurrency(payload[0].value)}</span>
            </div>
          </div>
        </div>
      );
    }
    return null;
  };

  return (
    <Card className="balance-trend">
      <div className="balance-trend__header">
        <h3 className="balance-trend__title">Balance Trend</h3>
        <p className="balance-trend__subtitle">Monthly income vs expense overview</p>
      </div>

      <div className="balance-trend__chart-container">
        <ResponsiveContainer width="100%" height={300}>
          <AreaChart data={data} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
            <defs>
              <linearGradient id="colorBalance" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="var(--color-primary)" stopOpacity={0.3} />
                <stop offset="95%" stopColor="var(--color-primary)" stopOpacity={0} />
              </linearGradient>
            </defs>
            <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="var(--border-color)" />
            <XAxis 
              dataKey="month" 
              axisLine={false} 
              tickLine={false} 
              tick={{ fill: 'var(--text-tertiary)', fontSize: 12 }} 
              dy={10}
            />
            <YAxis 
              axisLine={false} 
              tickLine={false} 
              tick={{ fill: 'var(--text-tertiary)', fontSize: 12 }}
              tickFormatter={(value) => `${value / 1000}k`}
            />
            <Tooltip content={<CustomTooltip />} />
            <Area 
              type="monotone" 
              dataKey="balance" 
              stroke="var(--color-primary)" 
              strokeWidth={3}
              fillOpacity={1} 
              fill="url(#colorBalance)" 
            />
          </AreaChart>
        </ResponsiveContainer>
      </div>
    </Card>
  );
};

export default BalanceTrend;
