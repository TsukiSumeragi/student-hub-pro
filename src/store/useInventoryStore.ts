import { create } from 'zustand';
import { products as mockProducts, categories as mockCategories, stockLogs as mockLogs } from '@/data/mock-data';
import { Product, Category, StockLog, SortField, SortDirection, StockStatus, getStockStatus } from '@/types/inventory';

interface InventoryState {
  products: Product[];
  categories: Category[];
  stockLogs: StockLog[];
  search: string;
  categoryFilter: string;
  statusFilter: StockStatus | '';
  sortField: SortField;
  sortDirection: SortDirection;
  page: number;
  pageSize: number;
  selectedIds: Set<string>;

  setSearch: (s: string) => void;
  setCategoryFilter: (c: string) => void;
  setStatusFilter: (s: StockStatus | '') => void;
  setSort: (field: SortField) => void;
  setPage: (p: number) => void;
  toggleSelect: (id: string) => void;
  selectAll: (ids: string[]) => void;
  clearSelection: () => void;
  deleteSelected: () => void;
  addProduct: (p: Product) => void;
  updateProduct: (id: string, data: Partial<Product>) => void;
  softDeleteProduct: (id: string) => void;

  getFilteredProducts: () => Product[];
  getPaginatedProducts: () => { items: Product[]; total: number; totalPages: number };
}

export const useInventoryStore = create<InventoryState>((set, get) => ({
  products: mockProducts,
  categories: mockCategories,
  stockLogs: mockLogs,
  search: '',
  categoryFilter: '',
  statusFilter: '',
  sortField: 'name',
  sortDirection: 'asc',
  page: 1,
  pageSize: 8,
  selectedIds: new Set(),

  setSearch: (s) => set({ search: s, page: 1 }),
  setCategoryFilter: (c) => set({ categoryFilter: c, page: 1 }),
  setStatusFilter: (s) => set({ statusFilter: s, page: 1 }),
  setSort: (field) => set((state) => ({
    sortField: field,
    sortDirection: state.sortField === field && state.sortDirection === 'asc' ? 'desc' : 'asc',
    page: 1,
  })),
  setPage: (p) => set({ page: p }),
  toggleSelect: (id) => set((state) => {
    const next = new Set(state.selectedIds);
    next.has(id) ? next.delete(id) : next.add(id);
    return { selectedIds: next };
  }),
  selectAll: (ids) => set((state) => {
    const all = ids.every(id => state.selectedIds.has(id));
    return { selectedIds: all ? new Set() : new Set(ids) };
  }),
  clearSelection: () => set({ selectedIds: new Set() }),
  deleteSelected: () => set((state) => ({
    products: state.products.map(p =>
      state.selectedIds.has(p.id) ? { ...p, deleted_at: new Date().toISOString() } : p
    ),
    selectedIds: new Set(),
  })),
  addProduct: (p) => set((state) => ({ products: [p, ...state.products] })),
  updateProduct: (id, data) => set((state) => ({
    products: state.products.map(p => p.id === id ? { ...p, ...data, updated_at: new Date().toISOString() } : p),
  })),
  softDeleteProduct: (id) => set((state) => ({
    products: state.products.map(p => p.id === id ? { ...p, deleted_at: new Date().toISOString() } : p),
  })),

  getFilteredProducts: () => {
    const { products, search, categoryFilter, statusFilter, sortField, sortDirection } = get();
    let filtered = products.filter(p => !p.deleted_at);

    if (search) {
      const q = search.toLowerCase();
      filtered = filtered.filter(p => p.name.toLowerCase().includes(q) || p.sku.toLowerCase().includes(q));
    }
    if (categoryFilter) {
      filtered = filtered.filter(p => p.category_id === categoryFilter);
    }
    if (statusFilter) {
      filtered = filtered.filter(p => getStockStatus(p.stock_quantity) === statusFilter);
    }

    filtered.sort((a, b) => {
      const av = a[sortField];
      const bv = b[sortField];
      const cmp = typeof av === 'string' ? av.localeCompare(bv as string) : (av as number) - (bv as number);
      return sortDirection === 'asc' ? cmp : -cmp;
    });

    return filtered;
  },

  getPaginatedProducts: () => {
    const { page, pageSize } = get();
    const filtered = get().getFilteredProducts();
    const total = filtered.length;
    const totalPages = Math.max(1, Math.ceil(total / pageSize));
    const items = filtered.slice((page - 1) * pageSize, page * pageSize);
    return { items, total, totalPages };
  },
}));
