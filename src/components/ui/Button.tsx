import { ButtonHTMLAttributes, forwardRef } from 'react'
import { cn } from '@/lib/utils'

export interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'ghost'
  size?: 'sm' | 'md' | 'lg'
}

export const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant = 'primary', size = 'md', ...props }, ref) => {
    return (
      <button
        className={cn(
          'inline-flex items-center justify-center rounded-lg font-medium transition-all duration-200 focus-visible:outline-none focus-visible:ring-2 disabled:opacity-50 disabled:pointer-events-none',
          {
            'bg-lime-400 text-slate-950 hover:bg-lime-500 focus-visible:ring-lime-400 focus-visible:ring-offset-2':
              variant === 'primary',
            'bg-slate-800 text-slate-300 hover:bg-slate-700 focus-visible:ring-slate-500 focus-visible:ring-offset-2':
              variant === 'secondary',
            'text-slate-300 hover:bg-slate-800 focus-visible:ring-slate-500 focus-visible:ring-offset-1':
              variant === 'ghost',
          },
          {
            'px-3 py-1.5 text-sm': size === 'sm',
            'px-4 py-2 text-base': size === 'md',
            'px-6 py-3 text-lg': size === 'lg',
          },
          className
        )}
        ref={ref}
        {...props}
      />
    )
  }
)

Button.displayName = 'Button'
