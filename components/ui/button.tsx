import { Slot } from '@radix-ui/react-slot';
import { cn, cva, type VariantProps } from 'lib/utils';
import { forwardRef } from 'react';

const buttonVariants = cva(
  // Base styles with WCAG AA focus-visible
  'inline-flex items-center justify-center whitespace-nowrap transition-all duration-200 font-medium focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary-500 focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 cursor-pointer select-none',
  {
    variants: {
      variant: {
        primary: [
          'bg-primary-500 text-white shadow-sm',
          'hover:bg-primary-600 hover:shadow-md hover:scale-[1.015]',
          'active:bg-primary-700 active:scale-[0.995] active:translate-y-px',
          'transition-all duration-200 ease-smooth'
        ],
        secondary: [
          'bg-secondary-500 text-white shadow-sm',
          'hover:bg-secondary-600 hover:shadow-md hover:scale-[1.015]',
          'active:bg-secondary-700 active:scale-[0.995] active:translate-y-px',
          'transition-all duration-200 ease-smooth'
        ],
        outline: [
          'border-2 border-primary-500 bg-transparent text-primary-500',
          'hover:bg-primary-50 hover:border-primary-600 hover:scale-[1.015]',
          'active:bg-primary-100 active:scale-[0.995] active:translate-y-px',
          'transition-all duration-200 ease-smooth'
        ],
        ghost: [
          'bg-transparent text-secondary-700 hover:bg-neutral-100',
          'hover:text-secondary-800 hover:scale-[1.015]',
          'active:bg-neutral-200 active:scale-[0.995] active:translate-y-px'
        ],
        destructive: [
          'bg-error text-white shadow-sm',
          'hover:bg-red-600 hover:shadow-md hover:scale-[1.015]',
          'active:bg-red-700 active:scale-[0.995] active:translate-y-px'
        ]
      },
      size: {
        sm: 'h-9 px-3 text-sm font-medium',
        md: 'h-11 px-6 text-base font-medium',
        lg: 'h-14 px-8 text-lg font-semibold',
        xl: 'h-16 px-10 text-xl font-bold',
        icon: 'h-11 w-11 p-0'
      },
      rounded: {
        sm: 'rounded-sm',
        md: 'rounded-md',
        lg: 'rounded-lg',
        xl: 'rounded-xl',
        full: 'rounded-full'
      }
    },
    defaultVariants: {
      variant: 'primary',
      size: 'md',
      rounded: 'md'
    }
  }
);

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {
  asChild?: boolean;
  loading?: boolean;
}

const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant, size, rounded, asChild = false, loading = false, children, disabled, ...props }, ref) => {
    const Comp = asChild ? Slot : 'button';
    
    return (
      <Comp
        className={cn(
          buttonVariants({ variant, size, rounded }),
          loading && 'pointer-events-none opacity-75',
          className
        )}
        ref={ref}
        disabled={disabled || loading}
        {...props}
      >
        {loading && (
          <svg 
            className="mr-2 h-4 w-4 animate-spin" 
            xmlns="http://www.w3.org/2000/svg" 
            fill="none" 
            viewBox="0 0 24 24"
          >
            <circle 
              className="opacity-25" 
              cx="12" 
              cy="12" 
              r="10" 
              stroke="currentColor" 
              strokeWidth="4"
            />
            <path 
              className="opacity-75" 
              fill="currentColor" 
              d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
            />
          </svg>
        )}
        {children}
      </Comp>
    );
  }
);

Button.displayName = 'Button';

export { Button, buttonVariants };
