import { cva, type VariantProps } from 'class-variance-authority';
import * as React from 'react';
import { cn } from '../../lib/utils';

const sectionTitleVariants = cva(
  'font-display font-semibold tracking-tight text-balance',
  {
    variants: {
      variant: {
        primary: 'text-primary-900 dark:text-primary-100',
        secondary: 'text-secondary-900 dark:text-secondary-100', 
        neutral: 'text-neutral-900 dark:text-neutral-100',
        accent: 'text-accent-700 dark:text-accent-300',
        gradient: 'bg-gradient-to-r from-primary-600 to-secondary-600 bg-clip-text text-transparent',
      },
      size: {
        sm: 'text-xl md:text-2xl',
        md: 'text-2xl md:text-3xl lg:text-4xl',
        lg: 'text-3xl md:text-4xl lg:text-5xl xl:text-6xl',
        xl: 'text-4xl md:text-5xl lg:text-6xl xl:text-7xl',
        hero: 'text-5xl md:text-6xl lg:text-7xl xl:text-8xl',
      },
      align: {
        left: 'text-left',
        center: 'text-center',
        right: 'text-right',
      },
      weight: {
        normal: 'font-normal',
        medium: 'font-medium',
        semibold: 'font-semibold',
        bold: 'font-bold',
        extrabold: 'font-extrabold',
      }
    },
    defaultVariants: {
      variant: 'primary',
      size: 'md', 
      align: 'left',
      weight: 'semibold',
    },
  }
);

const sectionSubtitleVariants = cva(
  'text-muted-foreground font-medium leading-relaxed text-balance',
  {
    variants: {
      size: {
        sm: 'text-sm',
        md: 'text-base md:text-lg',
        lg: 'text-lg md:text-xl',
        xl: 'text-xl md:text-2xl',
      },
      align: {
        left: 'text-left',
        center: 'text-center', 
        right: 'text-right',
      }
    },
    defaultVariants: {
      size: 'md',
      align: 'left',
    },
  }
);

export interface SectionTitleProps extends React.HTMLAttributes<HTMLDivElement> {
  title: string;
  subtitle?: string;
  titleProps?: VariantProps<typeof sectionTitleVariants>;
  subtitleProps?: VariantProps<typeof sectionSubtitleVariants>;
  as?: 'h1' | 'h2' | 'h3' | 'h4' | 'h5' | 'h6';
  animate?: boolean;
}

const SectionTitle = React.forwardRef<HTMLDivElement, SectionTitleProps>(
  ({ 
    className, 
    title, 
    subtitle, 
    titleProps = {},
    subtitleProps = {},
    as: Comp = 'h2',
    animate = false,
    ...props 
  }, ref) => {
    const animationClasses = animate 
      ? 'animate-reveal opacity-0 translate-y-4'
      : '';

    return (
      <div
        className={cn('space-y-2', animationClasses, className)}
        ref={ref}
        {...props}
      >
        <Comp
          className={sectionTitleVariants(titleProps)}
        >
          {title}
        </Comp>
        {subtitle && (
          <p className={sectionSubtitleVariants(subtitleProps)}>
            {subtitle}
          </p>
        )}
      </div>
    );
  }
);

SectionTitle.displayName = 'SectionTitle';

export { sectionSubtitleVariants, SectionTitle, sectionTitleVariants };

