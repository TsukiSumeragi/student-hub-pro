import { cn } from "@/lib/utils";
import { Badge } from "@/components/ui/badge";
import { StockStatus, getStockStatusLabel } from "@/types/inventory";

const statusStyles: Record<StockStatus, string> = {
  in_stock: 'bg-success/10 text-success border-success/20',
  low_stock: 'bg-warning/10 text-warning border-warning/20',
  out_of_stock: 'bg-destructive/10 text-destructive border-destructive/20',
};

export function StatusBadge({ status }: { status: StockStatus }) {
  return (
    <Badge variant="outline" className={cn('text-xs font-medium', statusStyles[status])}>
      {getStockStatusLabel(status)}
    </Badge>
  );
}
