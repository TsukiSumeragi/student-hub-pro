import { useState, useEffect, useCallback } from "react";
import { Search, Filter, Trash2, Download, Plus, ArrowUpDown, ChevronLeft, ChevronRight } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import {
  Select, SelectContent, SelectItem, SelectTrigger, SelectValue,
} from "@/components/ui/select";
import {
  Table, TableBody, TableCell, TableHead, TableHeader, TableRow,
} from "@/components/ui/table";
import { useInventoryStore } from "@/store/useInventoryStore";
import { useDebounce } from "@/hooks/useDebounce";
import { StatusBadge } from "./StatusBadge";
import { getStockStatus, SortField } from "@/types/inventory";
import { toast } from "@/hooks/use-toast";

interface InventoryTableProps {
  onAddProduct: () => void;
  onViewProduct: (id: string) => void;
}

export function InventoryTable({ onAddProduct, onViewProduct }: InventoryTableProps) {
  const {
    categories, categoryFilter, statusFilter, sortField, sortDirection,
    page, selectedIds,
    setSearch, setCategoryFilter, setStatusFilter, setSort, setPage,
    toggleSelect, selectAll, clearSelection, deleteSelected,
    getPaginatedProducts,
  } = useInventoryStore();

  const [localSearch, setLocalSearch] = useState('');
  const debouncedSearch = useDebounce(localSearch, 300);

  useEffect(() => { setSearch(debouncedSearch); }, [debouncedSearch, setSearch]);

  const { items, total, totalPages } = getPaginatedProducts();

  const handleDeleteSelected = useCallback(() => {
    const count = selectedIds.size;
    deleteSelected();
    toast({ title: `${count} product(s) deleted`, description: 'Items have been soft-deleted.' });
  }, [selectedIds.size, deleteSelected]);

  const handleExport = useCallback(() => {
    toast({ title: 'Export started', description: `Exporting ${selectedIds.size || total} items...` });
    clearSelection();
  }, [selectedIds.size, total, clearSelection]);

  const SortableHeader = ({ field, children }: { field: SortField; children: React.ReactNode }) => (
    <button onClick={() => setSort(field)} className="flex items-center gap-1 hover:text-foreground transition-colors">
      {children}
      <ArrowUpDown className={`w-3 h-3 ${sortField === field ? 'text-primary' : 'text-muted-foreground/40'}`} />
    </button>
  );

  return (
    <div className="space-y-4">
      {/* Toolbar */}
      <div className="flex flex-col sm:flex-row sm:items-center gap-3">
        <div className="relative flex-1 max-w-sm">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
          <Input
            placeholder="Search products or SKU..."
            value={localSearch}
            onChange={(e) => setLocalSearch(e.target.value)}
            className="pl-9 h-9 text-sm"
          />
        </div>
        <div className="flex items-center gap-2 flex-wrap">
          <Select value={categoryFilter || 'all'} onValueChange={(v) => setCategoryFilter(v === 'all' ? '' : v)}>
            <SelectTrigger className="w-[150px] h-9 text-sm">
              <Filter className="w-3.5 h-3.5 mr-1.5 text-muted-foreground" />
              <SelectValue placeholder="Category" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Categories</SelectItem>
              {categories.map(c => <SelectItem key={c.id} value={c.id}>{c.name}</SelectItem>)}
            </SelectContent>
          </Select>
          <Select value={statusFilter || 'all'} onValueChange={(v) => setStatusFilter(v === 'all' ? '' : v as any)}>
            <SelectTrigger className="w-[140px] h-9 text-sm">
              <SelectValue placeholder="Status" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Status</SelectItem>
              <SelectItem value="in_stock">In Stock</SelectItem>
              <SelectItem value="low_stock">Low Stock</SelectItem>
              <SelectItem value="out_of_stock">Out of Stock</SelectItem>
            </SelectContent>
          </Select>
          <div className="flex-1" />
          {selectedIds.size > 0 && (
            <>
              <Button variant="outline" size="sm" onClick={handleExport} className="h-9 text-xs gap-1.5">
                <Download className="w-3.5 h-3.5" /> Export ({selectedIds.size})
              </Button>
              <Button variant="destructive" size="sm" onClick={handleDeleteSelected} className="h-9 text-xs gap-1.5">
                <Trash2 className="w-3.5 h-3.5" /> Delete ({selectedIds.size})
              </Button>
            </>
          )}
          <Button size="sm" onClick={onAddProduct} className="h-9 text-xs gap-1.5">
            <Plus className="w-3.5 h-3.5" /> Add Product
          </Button>
        </div>
      </div>

      {/* Table */}
      <div className="border border-border rounded-lg overflow-hidden bg-card">
        <Table>
          <TableHeader>
            <TableRow className="hover:bg-transparent">
              <TableHead className="w-10">
                <Checkbox
                  checked={items.length > 0 && items.every(i => selectedIds.has(i.id))}
                  onCheckedChange={() => selectAll(items.map(i => i.id))}
                />
              </TableHead>
              <TableHead><SortableHeader field="name">Product</SortableHeader></TableHead>
              <TableHead><SortableHeader field="sku">SKU</SortableHeader></TableHead>
              <TableHead>Category</TableHead>
              <TableHead className="text-right"><SortableHeader field="stock_quantity">Stock</SortableHeader></TableHead>
              <TableHead className="text-right"><SortableHeader field="unit_price">Price</SortableHeader></TableHead>
              <TableHead>Status</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {items.length === 0 ? (
              <TableRow>
                <TableCell colSpan={7} className="text-center py-12 text-muted-foreground">
                  No products found.
                </TableCell>
              </TableRow>
            ) : items.map(p => {
              const cat = categories.find(c => c.id === p.category_id);
              return (
                <TableRow
                  key={p.id}
                  className="cursor-pointer"
                  onClick={() => onViewProduct(p.id)}
                  data-state={selectedIds.has(p.id) ? 'selected' : undefined}
                >
                  <TableCell onClick={(e) => e.stopPropagation()}>
                    <Checkbox checked={selectedIds.has(p.id)} onCheckedChange={() => toggleSelect(p.id)} />
                  </TableCell>
                  <TableCell className="font-medium text-foreground">{p.name}</TableCell>
                  <TableCell className="text-muted-foreground font-mono text-xs">{p.sku}</TableCell>
                  <TableCell className="text-muted-foreground">{cat?.name ?? '—'}</TableCell>
                  <TableCell className="text-right font-medium">{p.stock_quantity}</TableCell>
                  <TableCell className="text-right text-muted-foreground">${p.unit_price.toFixed(2)}</TableCell>
                  <TableCell><StatusBadge status={getStockStatus(p.stock_quantity)} /></TableCell>
                </TableRow>
              );
            })}
          </TableBody>
        </Table>
      </div>

      {/* Pagination */}
      <div className="flex items-center justify-between text-sm">
        <p className="text-muted-foreground">
          Showing {items.length} of {total} products
        </p>
        <div className="flex items-center gap-1.5">
          <Button variant="outline" size="icon" className="h-8 w-8" disabled={page <= 1} onClick={() => setPage(page - 1)}>
            <ChevronLeft className="w-4 h-4" />
          </Button>
          {Array.from({ length: totalPages }, (_, i) => (
            <Button
              key={i}
              variant={page === i + 1 ? 'default' : 'outline'}
              size="icon"
              className="h-8 w-8 text-xs"
              onClick={() => setPage(i + 1)}
            >
              {i + 1}
            </Button>
          ))}
          <Button variant="outline" size="icon" className="h-8 w-8" disabled={page >= totalPages} onClick={() => setPage(page + 1)}>
            <ChevronRight className="w-4 h-4" />
          </Button>
        </div>
      </div>
    </div>
  );
}
