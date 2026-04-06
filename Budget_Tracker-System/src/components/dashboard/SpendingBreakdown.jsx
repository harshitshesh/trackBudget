import React from 'react';
import { 
  PieChart, 
  Pie, 
  Cell, 
  ResponsiveContainer, 
  Tooltip, 
  Legend 
} from 'recharts';
import useStore from '../../store/useStore';
import { getCategoryBreakdown, formatCurrency } from '../../utils/helpers';
import Card from '../ui/Card';
import './SpendingBreakdown.css';

/**
 * SpendingBreakdown component displaying expense categories in a Donut Chart
 * (Requirement: At least one categorical visualization)
 */
const SpendingBreakdown = () => {
  const { transactions } = useStore();
  const data = getCategoryBreakdown(transactions);

  // Custom tooltip for pie chart
  const CustomTooltip = ({ active, payload }) => {
    if (active && payload && payload.length) {
      const { name, value, emoji, percentage } = payload[0].payload;
      return (
        <div className="chart-tooltip chart-tooltip--pie">
          <div className="chart-tooltip__header">
            <span className="emoji">{emoji}</span>
            <span className="label">{name}</span>
          </div>
          <div className="chart-tooltip__divider" />
          <div className="chart-tooltip__value-row">
            <span className="value">{formatCurrency(value)}</span>
            <span className="percentage">{percentage}%</span>
          </div>
        </div>
      );
    }
    return null;
  };

  // Custom Legend Renderer
  const renderSimpleLegend = (props) => {
    const { payload } = props;
    return (
      <ul className="spending-legend">
        {payload.slice(0, 5).map((entry, index) => (
          <li key={`item-${index}`} className="spending-legend__item">
            <span className="indicator" style={{ backgroundColor: entry.color }} />
            <span className="name">{entry.value}</span>
            <span className="value">{formatCurrency(data[index]?.value)}</span>
          </li>
        ))}
        {payload.length > 5 && (
          <li className="spending-legend__more">+{payload.length - 5} more categories</li>
        )}
      </ul>
    );
  };

  return (
    <Card className="spending-breakdown">
      <div className="spending-breakdown__header">
        <h3 className="spending-breakdown__title">Spending Breakdown</h3>
        <p className="spending-breakdown__subtitle">By category distribution</p>
      </div>

      <div className="spending-breakdown__content">
        {data.length > 0 ? (
          <>
            <div className="spending-breakdown__chart">
              <ResponsiveContainer width="100%" height={240}>
                <PieChart>
                  <Pie
                    data={data}
                    cx="50%"
                    cy="50%"
                    innerRadius={60}
                    outerRadius={80}
                    paddingAngle={5}
                    dataKey="value"
                  >
                    {data.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={entry.color} />
                    ))}
                  </Pie>
                  <Tooltip content={<CustomTooltip />} />
                </PieChart>
              </ResponsiveContainer>
              <div className="spending-breakdown__center-text">
                <span className="label">Total</span>
                <span className="value">
                  {formatCurrency(data.reduce((sum, item) => sum + item.value, 0))}
                </span>
              </div>
            </div>
            
            <div className="spending-breakdown__legend">
              <ResponsiveContainer width="100%" height={160}>
                <PieChart>
                    <Legend content={renderSimpleLegend} verticalAlign="middle" align="right" layout="vertical" />
                    <Pie data={data} dataKey="value" stroke="none" />
                </PieChart>
              </ResponsiveContainer>
            </div>
          </>
        ) : (
          <div className="empty-chart-msg">No expense data available</div>
        )}
      </div>
    </Card>
  );
};

export default SpendingBreakdown;
