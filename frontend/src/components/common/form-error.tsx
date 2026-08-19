import React from 'react';

interface FormErrorProps {
  message?: string;
}

export function FormError({ message }: FormErrorProps) {
  if (!message) return null;
  return (
    <p className="animate-in fade-in slide-in-from-top-1 mt-1 text-xs font-semibold text-red-500 duration-150">
      {message}
    </p>
  );
}
