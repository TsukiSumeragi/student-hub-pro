import { Package, AlertTriangle, XCircle, DollarSign } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { useInventoryStore } from "@/store/useInventoryStore";
import { getStockStatus } from "@/types/inventory";

export function StatsCards() {
  const products = useInventoryStore(s => s.products.filter(p => !p.deleted_at));

  const totalProducts = products.length;
  const lowStock = products.filter(p => getStockStatus(p.stock_quantity) === 'low_stock').length;
  const outOfStock = products.filter(p => getStockStatus(p.stock_quantity) === 'out_of_stock').length;
  const totalValue = products.reduce((sum, p) => sum + p.stock_quantity * p.unit_price, 0);

  const stats = [
    { label: 'Total Products', value: totalProducts, icon: Package, color: 'text-primary bg-primary/10' },
    { label: 'Low Stock', value: lowStock, icon: AlertTriangle, color: 'text-warning bg-warning/10' },
    { label: 'Out of Stock', value: outOfStock, icon: XCircle, color: 'text-destructive bg-destructive/10' },
    { label: 'Total Value', value: `$${totalValue.toLocaleString('en-US', { minimumFractionDigits: 0, maximumFractionDigits: 0 })}`, icon: DollarSign, color: 'text-success bg-success/10' },
  ];

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
      {stats.map((s) => (
        <Card key={s.label} className="border border-border shadow-none">
          <CardContent className="p-5 flex items-center gap-4">
            <div className={`w-10 h-10 rounded-lg flex items-center justify-center ${s.color}`}>
              <s.icon className="w-5 h-5" />
            </div>
            <div>
              <p className="text-xs text-muted-foreground">{s.label}</p>
              <p className="text-xl font-semibold text-foreground">{s.value}</p>
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  );
}
