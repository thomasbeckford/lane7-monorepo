import { Slot } from '@radix-ui/react-slot';
import { cva, type VariantProps } from 'class-variance-authority';
import * as React from 'react';

import { cn } from '@/lib/utils';

const buttonVariants = cva(
  'uppercase inline-flex items-center justify-center gap-2 whitespace-nowrap text-sm font-medium transition-all disabled:pointer-events-none disabled:opacity-50 outline-none focus-visible:border-ring focus-visible:ring-ring/50 focus-visible:ring-[3px] aria-invalid:ring-destructive/20 dark:aria-invalid:ring-destructive/40 aria-invalid:border-destructive cursor-pointer',
  {
    variants: {
      variant: {
        default:
          'bg-primary text-primary-foreground shadow-xs hover:bg-background hover:text-primary hover:border-primary border-2 hover:translate-y-[-2px] ',
        outline:
          'border-2 border-primary bg-transparent shadow-xs hover:bg-primary hover:text-secondary hover:translate-y-[-2px]',
        ghost: 'hover:bg-accent hover:text-accent-foreground dark:hover:bg-accent/50',
        link: 'text-primary underline-offset-4 hover:underline'
      },
      skew: {
        none: '',
        light: '-skew-x-6',
        medium: '-skew-x-12',
        heavy: '-skew-x-20',
        reverse: 'skew-x-12'
      },
      size: {
        default: 'h-9 px-4 py-2',
        sm: 'h-8 gap-1.5 px-3',
        lg: 'h-10 px-6 py-6',
        icon: 'size-9'
      }
    },
    defaultVariants: {
      variant: 'default',
      skew: 'heavy',
      size: 'lg'
    }
  }
);

// Variantes para el contenido interno (contrarresta el skew)
const contentVariants = cva('inline-flex items-center justify-center gap-2 transition-transform duration-300', {
  variants: {
    skew: {
      none: '',
      light: 'skew-x-6',
      medium: 'skew-x-12',
      heavy: 'skew-x-20',
      reverse: '-skew-x-12'
    }
  },
  defaultVariants: {
    skew: 'heavy'
  }
});

function Button({
  className,
  variant,
  skew,
  size,
  asChild = false,
  children,
  ...props
}: React.ComponentProps<'button'> &
  VariantProps<typeof buttonVariants> & {
    asChild?: boolean;
  }) {
  // Si no hay skew, renderiza normalmente
  if (skew === 'none') {
    const Comp = asChild ? Slot : 'button';
    return (
      <Comp data-slot="button" className={cn(buttonVariants({ variant, skew, size, className }))} {...props}>
        {children}
      </Comp>
    );
  }

  // Si hay skew, usa el wrapper interno
  const Comp = asChild ? Slot : 'button';
  return (
    <Comp data-slot="button" className={cn(buttonVariants({ variant, skew, size, className }), 'group')} {...props}>
      <span className={contentVariants({ skew })}>{children}</span>
    </Comp>
  );
}

export { Button, buttonVariants };
