import { useState } from "react";
import {
  Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import {
  Select, SelectContent, SelectItem, SelectTrigger, SelectValue,
} from "@/components/ui/select";
import { useInventoryStore } from "@/store/useInventoryStore";
import { toast } from "@/hooks/use-toast";

interface AddProductDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

const generateUUID = () => crypto.randomUUID();

export function AddProductDialog({ open, onOpenChange }: AddProductDialogProps) {
  const { categories, addProduct } = useInventoryStore();
  const [step, setStep] = useState(1);
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [form, setForm] = useState({
    name: '', sku: '', category_id: '', description: '',
    stock_quantity: '', unit_price: '',
  });

  const set = (key: string, value: string) => {
    setForm(f => ({ ...f, [key]: value }));
    setErrors(e => ({ ...e, [key]: '' }));
  };

  const validateStep1 = () => {
    const e: Record<string, string> = {};
    if (!form.name.trim()) e.name = 'Required';
    if (!form.sku.trim()) e.sku = 'Required';
    if (!form.category_id) e.category_id = 'Required';
    setErrors(e);
    return Object.keys(e).length === 0;
  };

  const validateStep2 = () => {
    const e: Record<string, string> = {};
    if (!form.stock_quantity || isNaN(+form.stock_quantity) || +form.stock_quantity < 0) e.stock_quantity = 'Enter a valid number';
    if (!form.unit_price || isNaN(+form.unit_price) || +form.unit_price <= 0) e.unit_price = 'Enter a valid price';
    setErrors(e);
    return Object.keys(e).length === 0;
  };

  const handleNext = () => {
    if (step === 1 && validateStep1()) setStep(2);
  };

  const handleSubmit = () => {
    if (!validateStep2()) return;
    const now = new Date().toISOString();
    addProduct({
      id: generateUUID(),
      name: form.name.trim(),
      sku: form.sku.trim().toUpperCase(),
      category_id: form.category_id,
      description: form.description.trim(),
      stock_quantity: +form.stock_quantity,
      unit_price: +form.unit_price,
      image_url: null,
      created_at: now,
      updated_at: now,
      deleted_at: null,
    });
    toast({ title: 'Product added', description: `${form.name} has been created.` });
    onOpenChange(false);
    setForm({ name: '', sku: '', category_id: '', description: '', stock_quantity: '', unit_price: '' });
    setStep(1);
    setErrors({});
  };

  const handleClose = (o: boolean) => {
    if (!o) { setStep(1); setErrors({}); }
    onOpenChange(o);
  };

  return (
    <Dialog open={open} onOpenChange={handleClose}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>Add New Product</DialogTitle>
          <DialogDescription>Step {step} of 2 — {step === 1 ? 'Basic Info' : 'Stock & Pricing'}</DialogDescription>
        </DialogHeader>

        {/* Progress indicator */}
        <div className="flex gap-2 mb-2">
          <div className={`h-1 flex-1 rounded-full ${step >= 1 ? 'bg-primary' : 'bg-muted'}`} />
          <div className={`h-1 flex-1 rounded-full ${step >= 2 ? 'bg-primary' : 'bg-muted'}`} />
        </div>

        {step === 1 ? (
          <div className="space-y-3">
            <div>
              <Label className="text-xs">Product Name *</Label>
              <Input value={form.name} onChange={e => set('name', e.target.value)} className="h-9 mt-1" placeholder="e.g. MacBook Pro" />
              {errors.name && <p className="text-xs text-destructive mt-1">{errors.name}</p>}
            </div>
            <div>
              <Label className="text-xs">SKU *</Label>
              <Input value={form.sku} onChange={e => set('sku', e.target.value)} className="h-9 mt-1" placeholder="e.g. ELEC-MBP-001" />
              {errors.sku && <p className="text-xs text-destructive mt-1">{errors.sku}</p>}
            </div>
            <div>
              <Label className="text-xs">Category *</Label>
              <Select value={form.category_id} onValueChange={v => set('category_id', v)}>
                <SelectTrigger className="h-9 mt-1"><SelectValue placeholder="Select category" /></SelectTrigger>
                <SelectContent>
                  {categories.map(c => <SelectItem key={c.id} value={c.id}>{c.name}</SelectItem>)}
                </SelectContent>
              </Select>
              {errors.category_id && <p className="text-xs text-destructive mt-1">{errors.category_id}</p>}
            </div>
            <div>
              <Label className="text-xs">Description</Label>
              <Textarea value={form.description} onChange={e => set('description', e.target.value)} className="mt-1" rows={3} placeholder="Optional description..." />
            </div>
            <Button onClick={handleNext} className="w-full">Next</Button>
          </div>
        ) : (
          <div className="space-y-3">
            <div>
              <Label className="text-xs">Stock Quantity *</Label>
              <Input type="number" min={0} value={form.stock_quantity} onChange={e => set('stock_quantity', e.target.value)} className="h-9 mt-1" placeholder="0" />
              {errors.stock_quantity && <p className="text-xs text-destructive mt-1">{errors.stock_quantity}</p>}
            </div>
            <div>
              <Label className="text-xs">Unit Price ($) *</Label>
              <Input type="number" min={0} step={0.01} value={form.unit_price} onChange={e => set('unit_price', e.target.value)} className="h-9 mt-1" placeholder="0.00" />
              {errors.unit_price && <p className="text-xs text-destructive mt-1">{errors.unit_price}</p>}
            </div>
            <div className="flex gap-2 pt-2">
              <Button variant="outline" onClick={() => setStep(1)} className="flex-1">Back</Button>
              <Button onClick={handleSubmit} className="flex-1">Create Product</Button>
            </div>
          </div>
        )}
      </DialogContent>
    </Dialog>
  );
}
