import { useState, useEffect } from "react";
import { SidebarProvider } from "@/components/ui/sidebar";
import { AppSidebar } from "@/components/dashboard/AppSidebar";
import { TopNavbar } from "@/components/dashboard/TopNavbar";
import { StatsCards } from "@/components/inventory/StatsCards";
import { InventoryTable } from "@/components/inventory/InventoryTable";
import { ProductDetailSheet } from "@/components/inventory/ProductDetailSheet";
import { AddProductDialog } from "@/components/inventory/AddProductDialog";
import { useUIStore } from "@/store/useUIStore";

const Index = () => {
  const theme = useUIStore(s => s.theme);
  const [addOpen, setAddOpen] = useState(false);
  const [detailId, setDetailId] = useState<string | null>(null);
  const [detailOpen, setDetailOpen] = useState(false);

  useEffect(() => {
    document.documentElement.classList.toggle('dark', theme === 'dark');
  }, [theme]);

  const handleViewProduct = (id: string) => {
    setDetailId(id);
    setDetailOpen(true);
  };

  return (
    <SidebarProvider>
      <div className="min-h-screen flex w-full">
        <AppSidebar />
        <div className="flex-1 flex flex-col min-w-0">
          <TopNavbar breadcrumbs={[{ label: 'Dashboard' }, { label: 'Inventory' }]} />
          <main className="flex-1 overflow-y-auto">
            <div className="max-w-[1440px] mx-auto px-6 py-6 space-y-6">
              <div>
                <h1 className="text-xl font-semibold text-foreground">Inventory Dashboard</h1>
                <p className="text-sm text-muted-foreground mt-0.5">Manage your products, stock levels, and categories.</p>
              </div>
              <StatsCards />
              <InventoryTable onAddProduct={() => setAddOpen(true)} onViewProduct={handleViewProduct} />
            </div>
          </main>
        </div>
      </div>

      <AddProductDialog open={addOpen} onOpenChange={setAddOpen} />
      <ProductDetailSheet productId={detailId} open={detailOpen} onOpenChange={setDetailOpen} />
    </SidebarProvider>
  );
};

export default Index;
