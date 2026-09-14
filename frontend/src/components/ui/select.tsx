'use client';

import * as React from 'react';
import { cn } from 'cn';
import { Check } from 'lucide-react';

// ─── Context ──────────────────────────────────────────────────────────────────

interface SelectContextValue {
  value: string;
  onValueChange: (v: string) => void;
  open: boolean;
  setOpen: (v: boolean) => void;
}

const SelectContext = React.createContext<SelectContextValue | null>(null);

function useSelect() {
  const ctx = React.useContext(SelectContext);
  if (!ctx) throw new Error('useSelect used outside <Select>');
  return ctx;
}

// ─── Select ───────────────────────────────────────────────────────────────────

interface SelectProps {
  value?: string;
  defaultValue?: string;
  onValueChange?: (v: string) => void;
  children: React.ReactNode;
}

function Select({ value: valueProp, defaultValue, onValueChange, children }: SelectProps) {
  const [internalValue, setInternalValue] = React.useState(defaultValue ?? '');
  const [open, setOpen] = React.useState(false);
  const controlled = valueProp !== undefined;
  const value = controlled ? valueProp! : internalValue;

  const handleChange = (v: string) => {
    if (!controlled) setInternalValue(v);
    onValueChange?.(v);
    setOpen(false);
  };

  return (
    <SelectContext.Provider value={{ value, onValueChange: handleChange, open, setOpen }}>
      <div className="relative">{children}</div>
    </SelectContext.Provider>
  );
}

// ─── SelectTrigger ────────────────────────────────────────────────────────────

function SelectTrigger({
  className,
  children,
  ...props
}: React.ButtonHTMLAttributes<HTMLButtonElement>) {
  const { open, setOpen } = useSelect();
  return (
    <button
      type="button"
      data-slot="select-trigger"
      aria-expanded={open}
      onClick={() => setOpen(!open)}
      className={cn(
        'border-input placeholder:text-muted-foreground focus:ring-ring/50 focus:border-ring flex h-8 w-full items-center justify-between rounded-lg border bg-transparent px-3 py-1 text-sm transition-colors focus:ring-2 focus:outline-none disabled:cursor-not-allowed disabled:opacity-50',
        className
      )}
      {...props}
    >
      {children}
      <svg
        xmlns="http://www.w3.org/2000/svg"
        className={`text-muted-foreground ml-2 size-4 shrink-0 transition-transform ${open ? 'rotate-180' : ''}`}
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth={2}
      >
        <path d="m6 9 6 6 6-6" />
      </svg>
    </button>
  );
}

// ─── SelectValue ──────────────────────────────────────────────────────────────

function SelectValue({ placeholder }: { placeholder?: string }) {
  const { value } = useSelect();
  return (
    <span className="flex-1 truncate text-left">
      {value || <span className="text-muted-foreground">{placeholder}</span>}
    </span>
  );
}

// ─── SelectContent ────────────────────────────────────────────────────────────

function SelectContent({ className, children, ...props }: React.HTMLAttributes<HTMLDivElement>) {
  const { open } = useSelect();
  if (!open) return null;
  return (
    <div
      data-slot="select-content"
      className={cn(
        'border-border bg-popover text-popover-foreground animate-in fade-in-0 zoom-in-95 absolute z-50 mt-1 max-h-60 w-full overflow-auto rounded-lg border p-1 shadow-md',
        className
      )}
      {...props}
    >
      {children}
    </div>
  );
}

// ─── SelectItem ───────────────────────────────────────────────────────────────

interface SelectItemProps extends React.HTMLAttributes<HTMLDivElement> {
  value: string;
}

function SelectItem({ value, children, className, ...props }: SelectItemProps) {
  const ctx = useSelect();
  const selected = ctx.value === value;
  return (
    <div
      data-slot="select-item"
      role="option"
      aria-selected={selected}
      onClick={() => ctx.onValueChange(value)}
      className={cn(
        'hover:bg-accent hover:text-accent-foreground relative flex cursor-pointer items-center rounded-md px-2 py-1.5 text-sm transition-colors outline-none select-none',
        selected && 'bg-accent text-accent-foreground font-medium',
        className
      )}
      {...props}
    >
      <span className="flex-1">{children}</span>
      {selected && <Check className="ml-2 size-4 shrink-0" />}
    </div>
  );
}

// ─── SelectLabel ──────────────────────────────────────────────────────────────

function SelectLabel({ className, ...props }: React.HTMLAttributes<HTMLDivElement>) {
  return (
    <div
      data-slot="select-label"
      className={cn('text-muted-foreground px-2 py-1 text-xs font-semibold', className)}
      {...props}
    />
  );
}

// ─── SelectSeparator ─────────────────────────────────────────────────────────

function SelectSeparator({ className, ...props }: React.HTMLAttributes<HTMLDivElement>) {
  return <div className={cn('bg-border -mx-1 my-1 h-px', className)} {...props} />;
}

export {
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectItem,
  SelectLabel,
  SelectSeparator,
};
