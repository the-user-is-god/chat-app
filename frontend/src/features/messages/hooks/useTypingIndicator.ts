// features/messages/hooks/useTypingIndicator.ts
import { useCallback, useEffect, useRef, useState } from 'react';
import { getSocket } from '@/lib/socket/socket';
import { useCurrentUser } from '@/features/auth/hooks/use-current-user';

interface TypingUser {
  userId: string;
  userName: string;
}

const STOP_TYPING_DELAY = 2000;

export function useTypingIndicator(channelId: string) {
  const { user } = useCurrentUser();
  const [typingUsers, setTypingUsers] = useState<TypingUser[]>([]);
  const stopTimeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const isTypingRef = useRef(false);

  useEffect(() => {
    if (!channelId) return;
    const socket = getSocket();

    const handleTyping = ({ userId, userName }: { userId: string; userName: string }) => {
      if (userId === user?.id) return;
      setTypingUsers((prev) =>
        prev.some((u) => u.userId === userId) ? prev : [...prev, { userId, userName }]
      );
    };

    const handleStoppedTyping = ({ userId }: { userId: string }) => {
      setTypingUsers((prev) => prev.filter((u) => u.userId !== userId));
    };

    socket.on('user:typing', handleTyping);
    socket.on('stopped:typing', handleStoppedTyping);

    return () => {
      socket.off('user:typing', handleTyping);
      socket.off('stopped:typing', handleStoppedTyping);
      setTypingUsers([]);
    };
  }, [channelId, user?.id]);

  const stopTyping = useCallback(() => {
    if (stopTimeoutRef.current) clearTimeout(stopTimeoutRef.current);
    if (isTypingRef.current) {
      isTypingRef.current = false;
      getSocket().emit('typing:stop', { channelId });
    }
  }, [channelId]);

  const notifyTyping = useCallback(() => {
    if (!isTypingRef.current) {
      isTypingRef.current = true;
      getSocket().emit('typing:start', { channelId });
    }
    if (stopTimeoutRef.current) clearTimeout(stopTimeoutRef.current);
    stopTimeoutRef.current = setTimeout(stopTyping, STOP_TYPING_DELAY);
  }, [channelId, stopTyping]);

  // Stop typing on unmount / channel switch
  useEffect(() => stopTyping, [stopTyping]);

  return { typingUsers, notifyTyping, stopTyping };
}
