import { Category, Product, StockLog } from '@/types/inventory';

export const categories: Category[] = [
  { id: 'c1a2b3c4-1111-4aaa-bbbb-000000000001', name: 'Electronics', description: 'Electronic devices and components' },
  { id: 'c1a2b3c4-1111-4aaa-bbbb-000000000002', name: 'Furniture', description: 'Office and home furniture' },
  { id: 'c1a2b3c4-1111-4aaa-bbbb-000000000003', name: 'Stationery', description: 'Office supplies and stationery' },
  { id: 'c1a2b3c4-1111-4aaa-bbbb-000000000004', name: 'Software', description: 'Software licenses and subscriptions' },
  { id: 'c1a2b3c4-1111-4aaa-bbbb-000000000005', name: 'Networking', description: 'Networking equipment' },
];

export const products: Product[] = [
  { id: 'p0000001-aaaa-4bbb-cccc-dddddddddd01', name: 'MacBook Pro 16"', sku: 'ELEC-MBP-001', category_id: 'c1a2b3c4-1111-4aaa-bbbb-000000000001', stock_quantity: 24, unit_price: 2499.00, description: 'Apple MacBook Pro 16-inch M3 Pro', image_url: null, created_at: '2024-01-15T08:00:00Z', updated_at: '2024-03-10T10:30:00Z', deleted_at: null },
  { id: 'p0000001-aaaa-4bbb-cccc-dddddddddd02', name: 'Dell UltraSharp 27"', sku: 'ELEC-MON-002', category_id: 'c1a2b3c4-1111-4aaa-bbbb-000000000001', stock_quantity: 8, unit_price: 649.00, description: '27-inch 4K UHD USB-C Monitor', image_url: null, created_at: '2024-01-20T08:00:00Z', updated_at: '2024-02-15T14:00:00Z', deleted_at: null },
  { id: 'p0000001-aaaa-4bbb-cccc-dddddddddd03', name: 'Herman Miller Aeron', sku: 'FURN-CHR-001', category_id: 'c1a2b3c4-1111-4aaa-bbbb-000000000002', stock_quantity: 5, unit_price: 1395.00, description: 'Ergonomic office chair, Size B', image_url: null, created_at: '2024-02-01T08:00:00Z', updated_at: '2024-03-01T09:00:00Z', deleted_at: null },
  { id: 'p0000001-aaaa-4bbb-cccc-dddddddddd04', name: 'Standing Desk Pro', sku: 'FURN-DSK-002', category_id: 'c1a2b3c4-1111-4aaa-bbbb-000000000002', stock_quantity: 0, unit_price: 799.00, description: 'Electric height-adjustable standing desk', image_url: null, created_at: '2024-02-10T08:00:00Z', updated_at: '2024-03-05T11:00:00Z', deleted_at: null },
  { id: 'p0000001-aaaa-4bbb-cccc-dddddddddd05', name: 'Moleskine Notebook', sku: 'STAT-NTB-001', category_id: 'c1a2b3c4-1111-4aaa-bbbb-000000000003', stock_quantity: 150, unit_price: 19.95, description: 'Classic hard cover ruled notebook', image_url: null, created_at: '2024-01-05T08:00:00Z', updated_at: '2024-01-05T08:00:00Z', deleted_at: null },
  { id: 'p0000001-aaaa-4bbb-cccc-dddddddddd06', name: 'Pilot G2 Pens (12pk)', sku: 'STAT-PEN-002', category_id: 'c1a2b3c4-1111-4aaa-bbbb-000000000003', stock_quantity: 320, unit_price: 12.99, description: 'Retractable gel ink pens, 0.7mm, black', image_url: null, created_at: '2024-01-10T08:00:00Z', updated_at: '2024-02-28T08:00:00Z', deleted_at: null },
  { id: 'p0000001-aaaa-4bbb-cccc-dddddddddd07', name: 'Adobe Creative Cloud', sku: 'SOFT-ADO-001', category_id: 'c1a2b3c4-1111-4aaa-bbbb-000000000004', stock_quantity: 45, unit_price: 54.99, description: 'Annual license per seat', image_url: null, created_at: '2024-03-01T08:00:00Z', updated_at: '2024-03-01T08:00:00Z', deleted_at: null },
  { id: 'p0000001-aaaa-4bbb-cccc-dddddddddd08', name: 'Microsoft 365 Business', sku: 'SOFT-MS-002', category_id: 'c1a2b3c4-1111-4aaa-bbbb-000000000004', stock_quantity: 120, unit_price: 12.50, description: 'Monthly subscription per user', image_url: null, created_at: '2024-01-01T08:00:00Z', updated_at: '2024-03-12T08:00:00Z', deleted_at: null },
  { id: 'p0000001-aaaa-4bbb-cccc-dddddddddd09', name: 'Ubiquiti UniFi AP', sku: 'NET-AP-001', category_id: 'c1a2b3c4-1111-4aaa-bbbb-000000000005', stock_quantity: 3, unit_price: 299.00, description: 'UniFi 6 Long-Range Access Point', image_url: null, created_at: '2024-02-20T08:00:00Z', updated_at: '2024-03-08T08:00:00Z', deleted_at: null },
  { id: 'p0000001-aaaa-4bbb-cccc-dddddddddd10', name: 'Cat6 Ethernet Cable', sku: 'NET-CBL-002', category_id: 'c1a2b3c4-1111-4aaa-bbbb-000000000005', stock_quantity: 0, unit_price: 8.99, description: '10ft Cat6 patch cable, blue', image_url: null, created_at: '2024-01-25T08:00:00Z', updated_at: '2024-03-10T08:00:00Z', deleted_at: null },
  { id: 'p0000001-aaaa-4bbb-cccc-dddddddddd11', name: 'Logitech MX Master 3S', sku: 'ELEC-MOU-003', category_id: 'c1a2b3c4-1111-4aaa-bbbb-000000000001', stock_quantity: 42, unit_price: 99.99, description: 'Wireless performance mouse', image_url: null, created_at: '2024-02-05T08:00:00Z', updated_at: '2024-03-01T08:00:00Z', deleted_at: null },
  { id: 'p0000001-aaaa-4bbb-cccc-dddddddddd12', name: 'Keychron K3 Pro', sku: 'ELEC-KEY-004', category_id: 'c1a2b3c4-1111-4aaa-bbbb-000000000001', stock_quantity: 15, unit_price: 89.00, description: 'Low-profile wireless mechanical keyboard', image_url: null, created_at: '2024-02-12T08:00:00Z', updated_at: '2024-03-09T08:00:00Z', deleted_at: null },
  { id: 'p0000001-aaaa-4bbb-cccc-dddddddddd13', name: 'Whiteboard 48x36"', sku: 'STAT-WBD-003', category_id: 'c1a2b3c4-1111-4aaa-bbbb-000000000003', stock_quantity: 7, unit_price: 89.00, description: 'Magnetic dry-erase whiteboard', image_url: null, created_at: '2024-01-18T08:00:00Z', updated_at: '2024-02-20T08:00:00Z', deleted_at: null },
  { id: 'p0000001-aaaa-4bbb-cccc-dddddddddd14', name: 'TP-Link 24-Port Switch', sku: 'NET-SWT-003', category_id: 'c1a2b3c4-1111-4aaa-bbbb-000000000005', stock_quantity: 0, unit_price: 189.99, description: 'Managed Gigabit Ethernet switch', image_url: null, created_at: '2024-02-28T08:00:00Z', updated_at: '2024-03-11T08:00:00Z', deleted_at: null },
  { id: 'p0000001-aaaa-4bbb-cccc-dddddddddd15', name: 'Bookshelf Unit', sku: 'FURN-SHF-003', category_id: 'c1a2b3c4-1111-4aaa-bbbb-000000000002', stock_quantity: 12, unit_price: 249.00, description: '5-shelf open bookcase, walnut finish', image_url: null, created_at: '2024-03-05T08:00:00Z', updated_at: '2024-03-05T08:00:00Z', deleted_at: null },
];

export const stockLogs: StockLog[] = [
  { id: 'sl-0001', product_id: 'p0000001-aaaa-4bbb-cccc-dddddddddd01', change: 30, reason: 'Initial stock', created_at: '2024-01-15T08:00:00Z' },
  { id: 'sl-0002', product_id: 'p0000001-aaaa-4bbb-cccc-dddddddddd01', change: -6, reason: 'Issued to Engineering team', created_at: '2024-03-10T10:30:00Z' },
  { id: 'sl-0003', product_id: 'p0000001-aaaa-4bbb-cccc-dddddddddd04', change: 10, reason: 'Initial stock', created_at: '2024-02-10T08:00:00Z' },
  { id: 'sl-0004', product_id: 'p0000001-aaaa-4bbb-cccc-dddddddddd04', change: -10, reason: 'Distributed to new hires', created_at: '2024-03-05T11:00:00Z' },
  { id: 'sl-0005', product_id: 'p0000001-aaaa-4bbb-cccc-dddddddddd10', change: 50, reason: 'Initial stock', created_at: '2024-01-25T08:00:00Z' },
  { id: 'sl-0006', product_id: 'p0000001-aaaa-4bbb-cccc-dddddddddd10', change: -50, reason: 'Office relocation wiring', created_at: '2024-03-10T08:00:00Z' },
];
