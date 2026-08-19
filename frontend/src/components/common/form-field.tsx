import React from 'react';
import { UseFormRegisterReturn } from 'react-hook-form';
import { FormError } from './form-error';

export interface FormFieldProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label: string;
  error?: string;
  registration: UseFormRegisterReturn;
  rightElement?: React.ReactNode;
}

/**
 * Standard data-entry input shell with reactive error styling rules and optional right element.
 */
export const FormField = ({
  label,
  error,
  registration,
  type = 'text',
  className = '',
  rightElement,
  ...props
}: FormFieldProps) => {
  return (
    <div className="w-full space-y-1.5">
      <div className="flex items-center justify-between">
        <label className="block text-xs font-bold tracking-tight text-zinc-300">{label}</label>
      </div>
      <div className="relative flex items-center">
        <input
          {...registration}
          {...props}
          type={type}
          className={`w-full rounded-xl border bg-zinc-900/80 px-3.5 py-2.5 text-sm text-white placeholder-zinc-500 shadow-sm transition-all outline-none focus:border-indigo-500 focus:ring-2 focus:ring-indigo-500/20 disabled:opacity-50 ${
            rightElement ? 'pr-10' : ''
          } ${
            error
              ? 'border-red-500/60 focus:border-red-500 focus:ring-red-500/20'
              : 'border-zinc-800 hover:border-zinc-700'
          } ${className}`}
        />
        {rightElement && (
          <div className="absolute right-3 flex items-center text-zinc-400">{rightElement}</div>
        )}
      </div>
      <FormError message={error} />
    </div>
  );
};

FormField.displayName = 'FormField';
