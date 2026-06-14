import { cn } from '@/lib/utils';

interface PillTagProps {
  label: string;
  emoji?: string;
  selected?: boolean;
  onClick?: () => void;
  variant?: 'default' | 'berry' | 'sage' | 'sand';
  size?: 'sm' | 'md';
}

const variantClasses = {
  default: 'bg-muted text-foreground hover:bg-muted/80',
  berry: 'bg-berry-light text-foreground hover:bg-berry-light/80',
  sage: 'bg-sage-light text-foreground hover:bg-sage-light/80',
  sand: 'bg-sand text-foreground hover:bg-sand/80',
};

const selectedClasses = {
  default: 'bg-primary text-primary-foreground hover:bg-primary/90',
  berry: 'bg-berry text-accent-foreground hover:bg-berry/90',
  sage: 'bg-primary text-primary-foreground hover:bg-primary/90',
  sand: 'bg-sand-dark text-primary-foreground hover:bg-sand-dark/90',
};

export function PillTag({
  label,
  emoji,
  selected = false,
  onClick,
  variant = 'default',
  size = 'md',
}: PillTagProps) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={cn(
        'inline-flex items-center gap-1.5 rounded-pill font-medium transition-all duration-200',
        size === 'sm' ? 'px-3 py-1 text-xs' : 'px-4 py-2 text-sm',
        selected ? selectedClasses[variant] : variantClasses[variant],
        onClick && 'cursor-pointer active:scale-95',
        !onClick && 'cursor-default'
      )}
    >
      {emoji && <span>{emoji}</span>}
      <span>{label}</span>
    </button>
  );
}
