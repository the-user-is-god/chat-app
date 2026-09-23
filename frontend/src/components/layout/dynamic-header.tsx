'use client';
import { useHeaderContext } from '@/providers/header-provider';

export function DynamicHeader() {
  const { header } = useHeaderContext();
  return (
    <div className="flex flex-1 items-center justify-between">
      <div className="flex items-center gap-2">
        {header.breadcrumb}
        <span className="text-sm font-semibold text-zinc-200">{header.title}</span>
      </div>
      <div className="flex items-center gap-2">{header.actions}</div>
    </div>
  );
}
