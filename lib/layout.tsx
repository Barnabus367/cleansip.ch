import { cva, type VariantProps } from 'class-variance-authority'
import * as React from 'react'
import { cn } from './utils'

/**
 * Container Component
 * Responsive container with max-width constraints
 */
const containerVariants = cva(
  'mx-auto px-4 sm:px-6 lg:px-8',
  {
    variants: {
      size: {
        sm: 'max-w-3xl',
        md: 'max-w-5xl', 
        lg: 'max-w-7xl',
        xl: 'max-w-[1600px]',
        full: 'max-w-full',
      },
      padding: {
        none: 'px-0',
        sm: 'px-4 sm:px-6',
        md: 'px-4 sm:px-6 lg:px-8',
        lg: 'px-6 sm:px-8 lg:px-12',
        xl: 'px-8 sm:px-12 lg:px-16',
      }
    },
    defaultVariants: {
      size: 'xl',
      padding: 'md',
    },
  }
)

export interface ContainerProps
  extends React.HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof containerVariants> {}

const Container = React.forwardRef<HTMLDivElement, ContainerProps>(
  ({ className, size, padding, ...props }, ref) => (
    <div
      ref={ref}
      className={cn(containerVariants({ size, padding }), className)}
      {...props}
    />
  )
)
Container.displayName = 'Container'

/**
 * Grid Component
 * Responsive CSS Grid with various layouts
 */
const gridVariants = cva(
  'grid',
  {
    variants: {
      cols: {
        1: 'grid-cols-1',
        2: 'grid-cols-1 md:grid-cols-2',
        3: 'grid-cols-1 md:grid-cols-2 lg:grid-cols-3',
        4: 'grid-cols-1 md:grid-cols-2 lg:grid-cols-4',
        6: 'grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-6',
        12: 'grid-cols-12',
      },
      gap: {
        none: 'gap-0',
        sm: 'gap-4',
        md: 'gap-6',
        lg: 'gap-8',
        xl: 'gap-12',
        '2xl': 'gap-16',
      },
      align: {
        start: 'items-start',
        center: 'items-center',
        end: 'items-end',
        stretch: 'items-stretch',
      },
      justify: {
        start: 'justify-items-start',
        center: 'justify-items-center',
        end: 'justify-items-end',
        stretch: 'justify-items-stretch',
      }
    },
    defaultVariants: {
      cols: 1,
      gap: 'md',
      align: 'stretch',
      justify: 'stretch',
    },
  }
)

export interface GridProps
  extends React.HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof gridVariants> {}

const Grid = React.forwardRef<HTMLDivElement, GridProps>(
  ({ className, cols, gap, align, justify, ...props }, ref) => (
    <div
      ref={ref}
      className={cn(gridVariants({ cols, gap, align, justify }), className)}
      {...props}
    />
  )
)
Grid.displayName = 'Grid'

/**
 * Flex Component
 * Flexible layout component with common patterns
 */
const flexVariants = cva(
  'flex',
  {
    variants: {
      direction: {
        row: 'flex-row',
        column: 'flex-col',
        'row-reverse': 'flex-row-reverse',
        'column-reverse': 'flex-col-reverse',
      },
      wrap: {
        nowrap: 'flex-nowrap',
        wrap: 'flex-wrap',
        'wrap-reverse': 'flex-wrap-reverse',
      },
      align: {
        start: 'items-start',
        center: 'items-center',
        end: 'items-end',
        stretch: 'items-stretch',
        baseline: 'items-baseline',
      },
      justify: {
        start: 'justify-start',
        center: 'justify-center',
        end: 'justify-end',
        between: 'justify-between',
        around: 'justify-around',
        evenly: 'justify-evenly',
      },
      gap: {
        none: 'gap-0',
        xs: 'gap-1',
        sm: 'gap-2',
        md: 'gap-4',
        lg: 'gap-6',
        xl: 'gap-8',
        '2xl': 'gap-12',
      }
    },
    defaultVariants: {
      direction: 'row',
      wrap: 'nowrap',
      align: 'center',
      justify: 'start',
      gap: 'md',
    },
  }
)

export interface FlexProps
  extends React.HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof flexVariants> {}

const Flex = React.forwardRef<HTMLDivElement, FlexProps>(
  ({ className, direction, wrap, align, justify, gap, ...props }, ref) => (
    <div
      ref={ref}
      className={cn(flexVariants({ direction, wrap, align, justify, gap }), className)}
      {...props}
    />
  )
)
Flex.displayName = 'Flex'

/**
 * Stack Component
 * Vertical spacing between children
 */
const stackVariants = cva(
  'flex flex-col',
  {
    variants: {
      spacing: {
        none: 'space-y-0',
        xs: 'space-y-1',
        sm: 'space-y-2',
        md: 'space-y-4',
        lg: 'space-y-6',
        xl: 'space-y-8',
        '2xl': 'space-y-12',
        '3xl': 'space-y-16',
      },
      align: {
        start: 'items-start',
        center: 'items-center',
        end: 'items-end',
        stretch: 'items-stretch',
      }
    },
    defaultVariants: {
      spacing: 'md',
      align: 'stretch',
    },
  }
)

export interface StackProps
  extends React.HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof stackVariants> {}

const Stack = React.forwardRef<HTMLDivElement, StackProps>(
  ({ className, spacing, align, ...props }, ref) => (
    <div
      ref={ref}
      className={cn(stackVariants({ spacing, align }), className)}
      {...props}
    />
  )
)
Stack.displayName = 'Stack'

/**
 * Section Component
 * Full-width sections with proper spacing
 */
const sectionVariants = cva(
  'w-full',
  {
    variants: {
      size: {
        sm: 'py-12',
        md: 'py-16 lg:py-20',
        lg: 'py-20 lg:py-28',
        xl: 'py-24 lg:py-32',
        '2xl': 'py-32 lg:py-40',
      },
      variant: {
        default: '',
        primary: 'bg-primary-50 dark:bg-primary-950',
        secondary: 'bg-secondary-50 dark:bg-secondary-950',
        accent: 'bg-accent-50 dark:bg-accent-950',
        neutral: 'bg-neutral-50 dark:bg-neutral-900',
        glass: 'bg-white/80 dark:bg-neutral-900/80 backdrop-blur-sm',
      }
    },
    defaultVariants: {
      size: 'md',
      variant: 'default',
    },
  }
)

export interface SectionProps
  extends React.HTMLAttributes<HTMLElement>,
    VariantProps<typeof sectionVariants> {}

const Section = React.forwardRef<HTMLElement, SectionProps>(
  ({ className, size, variant, ...props }, ref) => (
    <section
      ref={ref}
      className={cn(sectionVariants({ size, variant }), className)}
      {...props}
    />
  )
)
Section.displayName = 'Section'

export {
    Container, containerVariants, Flex, flexVariants, Grid, gridVariants, Section, sectionVariants, Stack, stackVariants
}

