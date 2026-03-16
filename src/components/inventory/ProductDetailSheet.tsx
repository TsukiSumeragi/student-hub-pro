import { useState } from "react";
import {
  Sheet, SheetContent, SheetHeader, SheetTitle, SheetDescription,
} from "@/components/ui/sheet";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import {
  Table, TableBody, TableCell, TableHead, TableHeader, TableRow,
} from "@/components/ui/table";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useInventoryStore } from "@/store/useInventoryStore";
import { StatusBadge } from "./StatusBadge";
import { getStockStatus } from "@/types/inventory";
import { toast } from "@/hooks/use-toast";

interface ProductDetailSheetProps {
  productId: string | null;
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export function ProductDetailSheet({ productId, open, onOpenChange }: ProductDetailSheetProps) {
  const { products, categories, stockLogs, updateProduct } = useInventoryStore();
  const product = products.find(p => p.id === productId);
  const [editing, setEditing] = useState(false);
  const [editData, setEditData] = useState({ name: '', description: '', unit_price: 0, stock_quantity: 0 });

  if (!product) return null;

  const category = categories.find(c => c.id === product.category_id);
  const logs = stockLogs.filter(l => l.product_id === product.id).sort((a, b) => b.created_at.localeCompare(a.created_at));

  const startEdit = () => {
    setEditData({ name: product.name, description: product.description, unit_price: product.unit_price, stock_quantity: product.stock_quantity });
    setEditing(true);
  };

  const saveEdit = () => {
    updateProduct(product.id, editData);
    setEditing(false);
    toast({ title: 'Product updated' });
  };

  return (
    <Sheet open={open} onOpenChange={(o) => { onOpenChange(o); setEditing(false); }}>
      <SheetContent className="w-full sm:max-w-lg overflow-y-auto">
        <SheetHeader className="pb-4">
          <SheetTitle className="text-lg">{product.name}</SheetTitle>
          <SheetDescription className="font-mono text-xs">{product.sku}</SheetDescription>
        </SheetHeader>

        <Tabs defaultValue="details">
          <TabsList className="w-full">
            <TabsTrigger value="details" className="flex-1">Details</TabsTrigger>
            <TabsTrigger value="history" className="flex-1">Stock History</TabsTrigger>
          </TabsList>

          <TabsContent value="details" className="mt-4 space-y-4">
            {editing ? (
              <div className="space-y-3">
                <div>
                  <Label className="text-xs">Name</Label>
                  <Input value={editData.name} onChange={e => setEditData(d => ({ ...d, name: e.target.value }))} className="h-9 mt-1" />
                </div>
                <div>
                  <Label className="text-xs">Description</Label>
                  <Textarea value={editData.description} onChange={e => setEditData(d => ({ ...d, description: e.target.value }))} className="mt-1" rows={3} />
                </div>
                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <Label className="text-xs">Price ($)</Label>
                    <Input type="number" value={editData.unit_price} onChange={e => setEditData(d => ({ ...d, unit_price: +e.target.value }))} className="h-9 mt-1" />
                  </div>
                  <div>
                    <Label className="text-xs">Stock Qty</Label>
                    <Input type="number" value={editData.stock_quantity} onChange={e => setEditData(d => ({ ...d, stock_quantity: +e.target.value }))} className="h-9 mt-1" />
                  </div>
                </div>
                <div className="flex gap-2 pt-2">
                  <Button size="sm" onClick={saveEdit}>Save</Button>
                  <Button size="sm" variant="outline" onClick={() => setEditing(false)}>Cancel</Button>
                </div>
              </div>
            ) : (
              <div className="space-y-3">
                <div className="flex justify-between items-start">
                  <div>
                    <p className="text-xs text-muted-foreground">Category</p>
                    <p className="text-sm font-medium text-foreground">{category?.name ?? '—'}</p>
                  </div>
                  <StatusBadge status={getStockStatus(product.stock_quantity)} />
                </div>
                <div>
                  <p className="text-xs text-muted-foreground">Description</p>
                  <p className="text-sm text-foreground">{product.description}</p>
                </div>
                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <p className="text-xs text-muted-foreground">Unit Price</p>
                    <p className="text-sm font-medium text-foreground">${product.unit_price.toFixed(2)}</p>
                  </div>
                  <div>
                    <p className="text-xs text-muted-foreground">Stock Quantity</p>
                    <p className="text-sm font-medium text-foreground">{product.stock_quantity}</p>
                  </div>
                </div>
                <div>
                  <p className="text-xs text-muted-foreground">Created</p>
                  <p className="text-sm text-foreground">{new Date(product.created_at).toLocaleDateString()}</p>
                </div>
                <Button size="sm" variant="outline" onClick={startEdit} className="mt-2">Edit Product</Button>
              </div>
            )}
          </TabsContent>

          <TabsContent value="history" className="mt-4">
            {logs.length === 0 ? (
              <p className="text-sm text-muted-foreground text-center py-8">No stock history available.</p>
            ) : (
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Date</TableHead>
                    <TableHead className="text-right">Change</TableHead>
                    <TableHead>Reason</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {logs.map(l => (
                    <TableRow key={l.id}>
                      <TableCell className="text-xs text-muted-foreground">{new Date(l.created_at).toLocaleDateString()}</TableCell>
                      <TableCell className={`text-right font-medium ${l.change >= 0 ? 'text-success' : 'text-destructive'}`}>
                        {l.change > 0 ? '+' : ''}{l.change}
                      </TableCell>
                      <TableCell className="text-sm">{l.reason}</TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            )}
          </TabsContent>
        </Tabs>
      </SheetContent>
    </Sheet>
  );
}
