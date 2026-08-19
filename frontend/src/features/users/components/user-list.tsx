'use client';

import { toast } from '@/utils/toast';
import { useUsers } from '../hooks/use-users';
import { StatusDisplay } from '@/components';

export function UserList() {
  const { users, pagination, isLoading, isError, error, nextPage, prevPage, deleteUser } =
    useUsers();

  if (isLoading) return <StatusDisplay variant="loading" title="Syncing User Manifest..." />;
  if (isError) return <StatusDisplay variant="error" description={error?.message} />;
  if (users.length === 0)
    return <StatusDisplay variant="empty" title="No matching entries caught on data nodes." />;

  const handleDelete = async (id: string) => {
    try {
      await deleteUser(id);
      toast.success('Entity purged successfully', `Removed database target identification: ${id}`);
    } catch (err) {
      toast.error(err, 'Failed to eliminate targeted user node.');
    }
  };

  return (
    <div className="space-y-4 rounded-xl border bg-white p-5 shadow-sm">
      <h3 className="text-sm font-bold tracking-tight text-zinc-900">
        Reference Framework View (CRUD)
      </h3>

      <div className="divide-y overflow-hidden rounded-lg border bg-zinc-50/50">
        {users.map((item) => (
          <div
            key={item.id}
            className="flex items-center justify-between p-3.5 text-xs transition-colors hover:bg-zinc-50"
          >
            <div>
              <p className="font-semibold text-zinc-900">{item.name}</p>
              <p className="mt-0.5 text-zinc-500">
                {item.email} •{' '}
                <span className="font-mono text-[10px] text-zinc-400">{item.id}</span>
              </p>
            </div>
            <button
              onClick={() => handleDelete(item.id)}
              className="rounded border border-red-200 px-2 py-1 font-medium text-red-600 transition-colors hover:bg-red-50 hover:text-red-700"
            >
              Delete
            </button>
          </div>
        ))}
      </div>

      {/* Standard Pagination Bar Wrapper */}
      <div className="flex items-center justify-between pt-2">
        <span className="text-[11px] font-medium text-zinc-500">
          Page <strong>{pagination?.currentPage}</strong> of {pagination?.totalPages}
        </span>
        <div className="flex gap-1.5">
          <button
            onClick={prevPage}
            disabled={!pagination?.hasPreviousPage}
            className="rounded border px-2.5 py-1 text-xs font-medium transition-colors hover:bg-zinc-50 disabled:opacity-40 disabled:hover:bg-transparent"
          >
            Previous
          </button>
          <button
            onClick={nextPage}
            disabled={!pagination?.hasNextPage}
            className="rounded border px-2.5 py-1 text-xs font-medium transition-colors hover:bg-zinc-50 disabled:opacity-40 disabled:hover:bg-transparent"
          >
            Next
          </button>
        </div>
      </div>
    </div>
  );
}
