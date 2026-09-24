import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import { getInitials } from '../utils/utils';

const ONLINE = ['Alice Chen', 'Bob Kumar', 'Sam Ray'];
const OFFLINE = ['Charlie Dev', 'Dana Wu', 'Eve Smith'];

export function MembersPanel({ onClose }: { onClose: () => void }) {
  return (
    <aside className="hidden w-64 shrink-0 flex-col border-l border-zinc-800 bg-zinc-950 lg:flex">
      <div className="flex items-center justify-between border-b border-zinc-800 px-4 py-3">
        <span className="text-sm font-semibold text-zinc-200">Members</span>
        <button onClick={onClose} className="text-zinc-500 transition-colors hover:text-zinc-200">
          ✕
        </button>
      </div>
      <div className="flex-1 overflow-y-auto p-3">
        <p className="mb-2 text-[11px] font-semibold tracking-wider text-zinc-600 uppercase">
          Online — {ONLINE.length}
        </p>
        {ONLINE.map((name) => (
          <div
            key={name}
            className="flex items-center gap-2 rounded-lg px-2 py-1.5 hover:bg-zinc-800"
          >
            <div className="relative">
              <Avatar className="size-7">
                <AvatarFallback className="bg-zinc-700 text-xs text-zinc-300">
                  {getInitials(name)}
                </AvatarFallback>
              </Avatar>
              <span className="absolute right-0 bottom-0 size-2 rounded-full bg-emerald-500 ring-1 ring-zinc-950" />
            </div>
            <span className="text-sm text-zinc-300">{name}</span>
          </div>
        ))}

        <p className="mt-4 mb-2 text-[11px] font-semibold tracking-wider text-zinc-600 uppercase">
          Offline — {OFFLINE.length}
        </p>
        {OFFLINE.map((name) => (
          <div
            key={name}
            className="flex items-center gap-2 rounded-lg px-2 py-1.5 hover:bg-zinc-800"
          >
            <div className="relative">
              <Avatar className="size-7">
                <AvatarFallback className="bg-zinc-800 text-xs text-zinc-500">
                  {getInitials(name)}
                </AvatarFallback>
              </Avatar>
              <span className="absolute right-0 bottom-0 size-2 rounded-full bg-zinc-600 ring-1 ring-zinc-950" />
            </div>
            <span className="text-sm text-zinc-500">{name}</span>
          </div>
        ))}
      </div>
    </aside>
  );
}
