'use client';

import * as React from 'react';
import { useUsersFilters } from '../hooks/use-users-filters';

export function UserFilters() {
  const { search, setFilters } = useUsersFilters();
  const [localSearch, setLocalSearch] = React.useState(search);

  // Synchronize local input state instantly if the URL parameter changes externally
  React.useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setLocalSearch(search);
  }, [search]);

  // Handle a simple input debounce
  React.useEffect(() => {
    const timer = setTimeout(() => {
      if (localSearch !== search) {
        setFilters({ search: localSearch });
      }
    }, 400); // Wait 400 milliseconds before appending search to the URL bar

    return () => clearTimeout(timer);
  }, [localSearch, search, setFilters]);

  return (
    <div className="flex items-center gap-3 rounded-xl border bg-zinc-50/50 p-4">
      <div className="flex-1 space-y-1">
        <label className="block text-[10px] font-bold tracking-wider text-zinc-400 uppercase">
          Search Node Query
        </label>
        <input
          type="text"
          value={localSearch}
          onChange={(e) => setLocalSearch(e.target.value)}
          placeholder="Filter by name, email coordinates..."
          className="w-full rounded-lg border border-zinc-200 bg-white p-2 text-xs transition-all outline-none focus:ring-2 focus:ring-zinc-950"
        />
      </div>
    </div>
  );
}
