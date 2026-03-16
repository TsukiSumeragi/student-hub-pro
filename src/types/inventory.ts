export interface Category {
  id: string;
  name: string;
  description: string;
}

export interface Product {
  id: string;
  name: string;
  sku: string;
  category_id: string;
  stock_quantity: number;
  unit_price: number;
  description: string;
  image_url: string | null;
  created_at: string;
  updated_at: string;
  deleted_at: string | null;
}

export interface StockLog {
  id: string;
  product_id: string;
  change: number;
  reason: string;
  created_at: string;
}

export type StockStatus = 'in_stock' | 'low_stock' | 'out_of_stock';

export function getStockStatus(quantity: number): StockStatus {
  if (quantity === 0) return 'out_of_stock';
  if (quantity < 10) return 'low_stock';
  return 'in_stock';
}

export function getStockStatusLabel(status: StockStatus): string {
  switch (status) {
    case 'in_stock': return 'In Stock';
    case 'low_stock': return 'Low Stock';
    case 'out_of_stock': return 'Out of Stock';
  }
}

export type SortField = 'name' | 'sku' | 'stock_quantity' | 'unit_price' | 'created_at';
export type SortDirection = 'asc' | 'desc';
