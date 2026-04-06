

import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { MOCK_TRANSACTIONS } from '../data/mockData';

const useStore = create(
  
  persist(
    (set, get) => ({

      
      // All transactions — initially loaded from mock data
      transactions: MOCK_TRANSACTIONS,
      
      // Current active filters for transaction list
      filters: {
        search: '',         
        type: 'all',         
        category: 'all',     
        dateFrom: '',        
        dateTo: '',        
        sortField: 'date',   
        sortOrder: 'desc', 
      },
      
      
      role: 'admin',
      
      // Theme preference — 'light' or 'dark'
      theme: 'light',
      
      // Currently active page/section in the dashboard
      activePage: 'dashboard',

      // ==========================================
      // ACTIONS — Transaction CRUD
   
      
   
      addTransaction: (transaction) =>
        set((state) => ({
          transactions: [transaction, ...state.transactions],
        })),

  
      editTransaction: (id, updatedData) =>
        set((state) => ({
          transactions: state.transactions.map((t) =>
            t.id === id ? { ...t, ...updatedData } : t
          ),
        })),

 
      deleteTransaction: (id) =>
        set((state) => ({
          transactions: state.transactions.filter((t) => t.id !== id),
        })),

      // ==========================================
      // ACTIONS — Filters
      // ==========================================
      
      setFilter: (key, value) =>
        set((state) => ({
          filters: { ...state.filters, [key]: value },
        })),

      clearFilters: () =>
        set({
          filters: {
            search: '',
            type: 'all',
            category: 'all',
            dateFrom: '',
            dateTo: '',
            sortField: 'date',
            sortOrder: 'desc',
          },
        }),

      // ==========================================
      // ACTIONS — UI State
      // ==========================================
      
     
      setRole: (role) => set({ role }),
      
 
      toggleTheme: () =>
        set((state) => {
          const newTheme = state.theme === 'light' ? 'dark' : 'light';
       
          document.documentElement.setAttribute('data-theme', newTheme);
          return { theme: newTheme };
        }),

      setActivePage: (page) => set({ activePage: page }),
    }),
    {
    
      name: 'finance-dashboard-store',
      
   
      partialize: (state) => ({
        transactions: state.transactions,
        theme: state.theme,
        role: state.role,
      }),

      onRehydrate: () => {
        return (state) => {
          if (state?.theme) {
            document.documentElement.setAttribute('data-theme', state.theme);
          }
        };
      },
    }
  )
);

export default useStore;
