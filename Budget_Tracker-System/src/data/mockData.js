

// ---------- CATEGORY DEFINITIONS ----------

export const CATEGORIES = {
  // Expense categories
  'Food & Dining': { color: '#f97316', emoji: '🍕', type: 'expense' },
  'Transport': { color: '#3b82f6', emoji: '🚗', type: 'expense' },
  'Shopping': { color: '#ec4899', emoji: '🛍️', type: 'expense' },
  'Entertainment': { color: '#8b5cf6', emoji: '🎬', type: 'expense' },
  'Bills & Utilities': { color: '#ef4444', emoji: '📱', type: 'expense' },
  'Healthcare': { color: '#14b8a6', emoji: '🏥', type: 'expense' },
  'Education': { color: '#6366f1', emoji: '📚', type: 'expense' },
  'Groceries': { color: '#22c55e', emoji: '🛒', type: 'expense' },
  'Rent': { color: '#f43f5e', emoji: '🏠', type: 'expense' },
  // Income categories
  'Salary': { color: '#10b981', emoji: '💰', type: 'income' },
  'Freelance': { color: '#06b6d4', emoji: '💻', type: 'income' },
  'Investment': { color: '#eab308', emoji: '📈', type: 'income' },
  'Gift': { color: '#d946ef', emoji: '🎁', type: 'income' },
};

// ---------- MOCK TRANSACTIONS ----------

export const MOCK_TRANSACTIONS = [
  // ---- October 2025 ----
  { id: 1, date: '2025-10-01', description: 'Monthly Salary', amount: 85000, category: 'Salary', type: 'income' },
  { id: 2, date: '2025-10-02', description: 'House Rent Payment', amount: 18000, category: 'Rent', type: 'expense' },
  { id: 3, date: '2025-10-03', description: 'Grocery Shopping - Big Basket', amount: 3500, category: 'Groceries', type: 'expense' },
  { id: 4, date: '2025-10-05', description: 'Uber Rides', amount: 1200, category: 'Transport', type: 'expense' },
  { id: 5, date: '2025-10-07', description: 'Netflix & Spotify Subscription', amount: 799, category: 'Entertainment', type: 'expense' },
  { id: 6, date: '2025-10-08', description: 'Electricity Bill', amount: 2100, category: 'Bills & Utilities', type: 'expense' },
  { id: 7, date: '2025-10-10', description: 'Freelance Web Project', amount: 15000, category: 'Freelance', type: 'income' },
  { id: 8, date: '2025-10-12', description: 'Restaurant Dinner - Fine Dine', amount: 2800, category: 'Food & Dining', type: 'expense' },
  { id: 9, date: '2025-10-15', description: 'Amazon Shopping - Electronics', amount: 4500, category: 'Shopping', type: 'expense' },
  { id: 10, date: '2025-10-18', description: 'Doctor Visit & Medicines', amount: 1500, category: 'Healthcare', type: 'expense' },
  
  // ---- November 2025 ----
  { id: 11, date: '2025-11-01', description: 'Monthly Salary', amount: 85000, category: 'Salary', type: 'income' },
  { id: 12, date: '2025-11-02', description: 'House Rent Payment', amount: 18000, category: 'Rent', type: 'expense' },
  { id: 13, date: '2025-11-03', description: 'Swiggy Food Orders', amount: 4200, category: 'Food & Dining', type: 'expense' },
  { id: 14, date: '2025-11-05', description: 'Diwali Shopping - Clothes', amount: 8500, category: 'Shopping', type: 'expense' },
  { id: 15, date: '2025-11-06', description: 'Petrol Refill', amount: 3000, category: 'Transport', type: 'expense' },
  { id: 16, date: '2025-11-08', description: 'Diwali Gift from Family', amount: 10000, category: 'Gift', type: 'income' },
  { id: 17, date: '2025-11-10', description: 'Mobile Recharge & WiFi', amount: 1500, category: 'Bills & Utilities', type: 'expense' },
  { id: 18, date: '2025-11-12', description: 'Udemy Course Purchase', amount: 499, category: 'Education', type: 'expense' },
  { id: 19, date: '2025-11-15', description: 'Freelance Logo Design', amount: 8000, category: 'Freelance', type: 'income' },
  { id: 20, date: '2025-11-20', description: 'Grocery Shopping - DMart', amount: 4100, category: 'Groceries', type: 'expense' },
  { id: 21, date: '2025-11-25', description: 'Movie Night - PVR Cinemas', amount: 1200, category: 'Entertainment', type: 'expense' },
  
  // ---- December 2025 ----
  { id: 22, date: '2025-12-01', description: 'Monthly Salary', amount: 85000, category: 'Salary', type: 'income' },
  { id: 23, date: '2025-12-02', description: 'House Rent Payment', amount: 18000, category: 'Rent', type: 'expense' },
  { id: 24, date: '2025-12-03', description: 'Mutual Fund Returns', amount: 5500, category: 'Investment', type: 'income' },
  { id: 25, date: '2025-12-05', description: 'Zomato Orders Weekly', amount: 3200, category: 'Food & Dining', type: 'expense' },
  { id: 26, date: '2025-12-07', description: 'Year-End Sale Shopping', amount: 12000, category: 'Shopping', type: 'expense' },
  { id: 27, date: '2025-12-08', description: 'Ola Auto Rides', amount: 900, category: 'Transport', type: 'expense' },
  { id: 28, date: '2025-12-10', description: 'Electricity & Water Bill', amount: 2800, category: 'Bills & Utilities', type: 'expense' },
  { id: 29, date: '2025-12-12', description: 'Gym Membership Renewal', amount: 3000, category: 'Healthcare', type: 'expense' },
  { id: 30, date: '2025-12-15', description: 'Christmas Party Expense', amount: 5000, category: 'Entertainment', type: 'expense' },
  { id: 31, date: '2025-12-18', description: 'Freelance App Development', amount: 25000, category: 'Freelance', type: 'income' },
  { id: 32, date: '2025-12-22', description: 'Grocery - Monthly Stock', amount: 5500, category: 'Groceries', type: 'expense' },
  
  // ---- January 2026 ----
  { id: 33, date: '2026-01-01', description: 'Monthly Salary + Bonus', amount: 110000, category: 'Salary', type: 'income' },
  { id: 34, date: '2026-01-02', description: 'House Rent Payment', amount: 18000, category: 'Rent', type: 'expense' },
  { id: 35, date: '2026-01-04', description: 'New Year Dinner', amount: 3500, category: 'Food & Dining', type: 'expense' },
  { id: 36, date: '2026-01-06', description: 'Metro Card Recharge', amount: 2000, category: 'Transport', type: 'expense' },
  { id: 37, date: '2026-01-08', description: 'Online Course - React Advanced', amount: 1299, category: 'Education', type: 'expense' },
  { id: 38, date: '2026-01-10', description: 'Amazon Prime + Hotstar', amount: 999, category: 'Entertainment', type: 'expense' },
  { id: 39, date: '2026-01-12', description: 'Flipkart Republic Day Sale', amount: 6500, category: 'Shopping', type: 'expense' },
  { id: 40, date: '2026-01-15', description: 'Gas & Electricity Bill', amount: 3200, category: 'Bills & Utilities', type: 'expense' },
  { id: 41, date: '2026-01-18', description: 'Freelance UI/UX Project', amount: 12000, category: 'Freelance', type: 'income' },
  { id: 42, date: '2026-01-20', description: 'Weekly Groceries', amount: 2800, category: 'Groceries', type: 'expense' },
  { id: 43, date: '2026-01-25', description: 'Dental Checkup', amount: 2000, category: 'Healthcare', type: 'expense' },
  
  // ---- February 2026 ----
  { id: 44, date: '2026-02-01', description: 'Monthly Salary', amount: 85000, category: 'Salary', type: 'income' },
  { id: 45, date: '2026-02-02', description: 'House Rent Payment', amount: 18000, category: 'Rent', type: 'expense' },
  { id: 46, date: '2026-02-05', description: 'Valentine Dinner Date', amount: 4500, category: 'Food & Dining', type: 'expense' },
  { id: 47, date: '2026-02-07', description: 'Cab Rides Weekly', amount: 1800, category: 'Transport', type: 'expense' },
  { id: 48, date: '2026-02-10', description: 'Stock Dividend Payout', amount: 7500, category: 'Investment', type: 'income' },
  { id: 49, date: '2026-02-12', description: 'Valentine Gift - Shopping', amount: 5000, category: 'Shopping', type: 'expense' },
  { id: 50, date: '2026-02-14', description: 'Internet & Phone Bill', amount: 1800, category: 'Bills & Utilities', type: 'expense' },
  { id: 51, date: '2026-02-16', description: 'Stand-up Comedy Show', amount: 1500, category: 'Entertainment', type: 'expense' },
  { id: 52, date: '2026-02-18', description: 'Freelance Consulting', amount: 10000, category: 'Freelance', type: 'income' },
  { id: 53, date: '2026-02-20', description: 'Groceries & Essentials', amount: 3800, category: 'Groceries', type: 'expense' },
  { id: 54, date: '2026-02-22', description: 'Birthday Gift Received', amount: 5000, category: 'Gift', type: 'income' },
  
  // ---- March 2026 ----
  { id: 55, date: '2026-03-01', description: 'Monthly Salary', amount: 85000, category: 'Salary', type: 'income' },
  { id: 56, date: '2026-03-02', description: 'House Rent Payment', amount: 18000, category: 'Rent', type: 'expense' },
  { id: 57, date: '2026-03-04', description: 'Holi Party Expenses', amount: 3000, category: 'Food & Dining', type: 'expense' },
  { id: 58, date: '2026-03-06', description: 'Train Tickets - Weekend Trip', amount: 2500, category: 'Transport', type: 'expense' },
  { id: 59, date: '2026-03-08', description: 'Coursera Subscription', amount: 3499, category: 'Education', type: 'expense' },
  { id: 60, date: '2026-03-10', description: 'Myntra Fashion Sale', amount: 7000, category: 'Shopping', type: 'expense' },
  { id: 61, date: '2026-03-12', description: 'Electricity Bill', amount: 2400, category: 'Bills & Utilities', type: 'expense' },
  { id: 62, date: '2026-03-14', description: 'Eye Checkup & Glasses', amount: 4500, category: 'Healthcare', type: 'expense' },
  { id: 63, date: '2026-03-16', description: 'Freelance Backend Project', amount: 20000, category: 'Freelance', type: 'income' },
  { id: 64, date: '2026-03-18', description: 'Concert Tickets', amount: 3500, category: 'Entertainment', type: 'expense' },
  { id: 65, date: '2026-03-20', description: 'Monthly Grocery Haul', amount: 4200, category: 'Groceries', type: 'expense' },
];

// ---------- MONTH NAMES ----------
// Helper array for chart labels
export const MONTH_NAMES = [
  'Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun',
  'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'
];

// ---------- ROLE OPTIONS ----------
export const ROLES = [
  { value: 'admin', label: 'Admin', description: 'Can take control of his/her income and expense' },
  { value: 'viewer', label: 'Viewer', description: 'View only access' },
];
