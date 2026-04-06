

import { format, parseISO, startOfMonth, isWithinInterval } from 'date-fns';
import { CATEGORIES } from '../data/mockData';

// ---------- CURRENCY FORMATTER ----------

export const formatCurrency = (amount) => {
  return new Intl.NumberFormat('en-IN', {
    style: 'currency',
    currency: 'INR',
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  }).format(amount);
};

// ---------- DATE FORMATTER ----------

export const formatDate = (dateString) => {
  return format(parseISO(dateString), 'MMM dd, yyyy');
};


export const formatMonthYear = (dateString) => {
  return format(parseISO(dateString), 'MMM yyyy');
};

// ---------- FINANCIAL CALCULATIONS ----------

export const calculateTotalIncome = (transactions) => {
  return transactions
    .filter((t) => t.type === 'income')
    .reduce((sum, t) => sum + t.amount, 0);
};


export const calculateTotalExpenses = (transactions) => {
  return transactions
    .filter((t) => t.type === 'expense')
    .reduce((sum, t) => sum + t.amount, 0);
};

// Balance = Income - Expenses
export const calculateBalance = (transactions) => {
  return calculateTotalIncome(transactions) - calculateTotalExpenses(transactions);
};

// Savings rate as percentage
// Formula: (Income - Expenses) / Income * 100
export const calculateSavingsRate = (transactions) => {
  const income = calculateTotalIncome(transactions);
  const expenses = calculateTotalExpenses(transactions);
  if (income === 0) return 0;
  return ((income - expenses) / income * 100).toFixed(1);
};

// ---------- DATA AGGREGATION ----------

// Category-wise spending breakdown for pie chart
export const getCategoryBreakdown = (transactions) => {
  const expenseTransactions = transactions.filter((t) => t.type === 'expense');
  const categoryTotals = {};

  expenseTransactions.forEach((t) => {
    if (!categoryTotals[t.category]) {
      categoryTotals[t.category] = 0;
    }
    categoryTotals[t.category] += t.amount;
  });

  return Object.entries(categoryTotals)
    .map(([name, value]) => ({
      name,
      value,
      color: CATEGORIES[name]?.color || '#64748b',
      emoji: CATEGORIES[name]?.emoji || '📦',
    }))
    .sort((a, b) => b.value - a.value); // Highest spending first
};

// Monthly income vs expense data for bar/line charts
export const getMonthlyData = (transactions) => {
  const monthlyMap = {};

  transactions.forEach((t) => {
    const monthKey = format(parseISO(t.date), 'yyyy-MM');
    const monthLabel = format(parseISO(t.date), 'MMM yyyy');

    if (!monthlyMap[monthKey]) {
      monthlyMap[monthKey] = {
        month: monthLabel,
        monthKey,
        income: 0,
        expense: 0,
      };
    }

    if (t.type === 'income') {
      monthlyMap[monthKey].income += t.amount;
    } else {
      monthlyMap[monthKey].expense += t.amount;
    }
  });

  return Object.values(monthlyMap)
    .sort((a, b) => a.monthKey.localeCompare(b.monthKey))
    .map((m) => ({
      ...m,
      balance: m.income - m.expense,
    }));
};

// ---------- INSIGHTS HELPERS ----------

export const getHighestSpendingCategory = (transactions) => {
  const breakdown = getCategoryBreakdown(transactions);
  if (breakdown.length === 0) return null;
  
  const totalExpense = breakdown.reduce((sum, cat) => sum + cat.value, 0);
  const highest = breakdown[0]; // Already sorted by value desc
  
  return {
    ...highest,
    percentage: ((highest.value / totalExpense) * 100).toFixed(1),
  };
};

export const getAverageDailySpend = (transactions) => {
  const expenses = transactions.filter((t) => t.type === 'expense');
  if (expenses.length === 0) return 0;

  // Find date range
  const dates = expenses.map((t) => parseISO(t.date));
  const minDate = new Date(Math.min(...dates));
  const maxDate = new Date(Math.max(...dates));
  
  // Days between first and last expense
  const days = Math.max(1, Math.ceil((maxDate - minDate) / (1000 * 60 * 60 * 24)));
  const totalExpense = expenses.reduce((sum, t) => sum + t.amount, 0);
  
  return Math.round(totalExpense / days);
};

// Month over month comparison for last 2 months
export const getMonthComparison = (transactions) => {
  const monthlyData = getMonthlyData(transactions);
  if (monthlyData.length < 2) return null;

  const current = monthlyData[monthlyData.length - 1];
  const previous = monthlyData[monthlyData.length - 2];

  const expenseChange = previous.expense === 0 
    ? 0 
    : (((current.expense - previous.expense) / previous.expense) * 100).toFixed(1);

  const incomeChange = previous.income === 0
    ? 0
    : (((current.income - previous.income) / previous.income) * 100).toFixed(1);

  return {
    current,
    previous,
    expenseChange: Number(expenseChange),
    incomeChange: Number(incomeChange),
  };
};

// ---------- FILTER HELPERS ----------

export const filterTransactions = (transactions, filters) => {
  return transactions.filter((t) => {
    // Search filter — description mein search karta hai
    if (filters.search && !t.description.toLowerCase().includes(filters.search.toLowerCase())) {
      return false;
    }

    if (filters.type && filters.type !== 'all' && t.type !== filters.type) {
      return false;
    }

    // Category filter — specific category
    if (filters.category && filters.category !== 'all' && t.category !== filters.category) {
      return false;
    }

    // Date range filter
    if (filters.dateFrom && t.date < filters.dateFrom) {
      return false;
    }
    if (filters.dateTo && t.date > filters.dateTo) {
      return false;
    }

    return true;
  });
};

// ---------- SORT HELPERS ----------

export const sortTransactions = (transactions, sortField, sortOrder) => {
  return [...transactions].sort((a, b) => {
    let comparison = 0;

    switch (sortField) {
      case 'date':
        comparison = a.date.localeCompare(b.date);
        break;
      case 'amount':
        comparison = a.amount - b.amount;
        break;
      case 'category':
        comparison = a.category.localeCompare(b.category);
        break;
      case 'description':
        comparison = a.description.localeCompare(b.description);
        break;
      default:
        comparison = a.date.localeCompare(b.date);
    }
 
    // Ascending or descending order
    return sortOrder === 'asc' ? comparison : -comparison;
  });
};

// ---------- EXPORT HELPERS ----------

export const exportToCSV = (transactions) => {
  const headers = ['Date', 'Description', 'Amount', 'Category', 'Type'];
  const rows = transactions.map((t) => [
    t.date,
    `"${t.description}"`, 
    t.amount,
    t.category,
    t.type,
  ]);

  const csv = [headers.join(','), ...rows.map((r) => r.join(','))].join('\n');
  downloadFile(csv, 'transactions.csv', 'text/csv');
};

export const exportToJSON = (transactions) => {
  const json = JSON.stringify(transactions, null, 2);
  downloadFile(json, 'transactions.json', 'application/json');
};

const downloadFile = (content, filename, mimeType) => {
  const blob = new Blob([content], { type: mimeType });
  const url = URL.createObjectURL(blob);
  const link = document.createElement('a');
  link.href = url;
  link.download = filename;
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
  URL.revokeObjectURL(url);
};

// Unique ID generator for new transactions
export const generateId = () => {
  return Date.now() + Math.random().toString(36).substr(2, 9);
};
