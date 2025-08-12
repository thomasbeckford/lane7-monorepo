import { cn } from '@/lib/utils';
import * as React from 'react';

interface SectionProps extends React.HTMLAttributes<HTMLElement> {
  spacing?: 'sm' | 'md' | 'lg' | 'xl';
  background?: 'default' | 'muted' | 'accent' | 'brand' | 'pattern';
  container?: boolean;
}

const sectionVariants = {
  spacing: {
    sm: 'py-8 md:py-12',
    md: 'py-12 md:py-16',
    lg: 'py-16 md:py-20',
    xl: 'py-20 md:py-24'
  },
  background: {
    default: 'bg-background',
    muted: 'bg-muted/30',
    accent: 'bg-accent/50',
    brand: 'bg-gradient-to-br from-brand-50 to-brand-100 dark:from-brand-900/20 dark:to-brand-800/10',
    pattern:
      'relative before:absolute before:inset-0 before:bg-[url("/background.svg")] before:bg-[length:800px] before:bg-repeat before:bg-[position:0_0,100px_100px] before:opacity-15 before:-z-10'
  }
};

const Section = React.forwardRef<HTMLElement, SectionProps>(
  ({ spacing = 'md', background = 'default', container = true, className, children, ...props }, ref) => {
    const content = container ? <div className="mx-auto">{children}</div> : children;

    return (
      <section
        ref={ref}
        className={cn(sectionVariants.spacing[spacing], sectionVariants.background[background], className)}
        {...props}
      >
        {content}
      </section>
    );
  }
);
Section.displayName = 'Section';

const SectionHeader = React.forwardRef<HTMLDivElement, React.HTMLAttributes<HTMLDivElement>>(
  ({ className, ...props }, ref) => (
    <div ref={ref} className={cn('text-center space-y-4 mb-12 max-w-3xl mx-auto', className)} {...props} />
  )
);
SectionHeader.displayName = 'SectionHeader';

const SectionTitle = React.forwardRef<HTMLHeadingElement, React.HTMLAttributes<HTMLHeadingElement>>(
  ({ className, ...props }, ref) => (
    <h2 ref={ref} className={cn('text-display-lg font-bold tracking-tight', className)} {...props} />
  )
);
SectionTitle.displayName = 'SectionTitle';

const SectionDescription = React.forwardRef<HTMLParagraphElement, React.HTMLAttributes<HTMLParagraphElement>>(
  ({ className, ...props }, ref) => (
    <p ref={ref} className={cn('text-xl text-muted-foreground leading-relaxed', className)} {...props} />
  )
);
SectionDescription.displayName = 'SectionDescription';

export { Section, SectionDescription, SectionHeader, SectionTitle };
