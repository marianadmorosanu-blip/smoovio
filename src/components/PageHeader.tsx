import { ArrowLeft } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';

interface PageHeaderProps {
  title: string;
  subtitle?: string;
  showBack?: boolean;
  backTo?: string;
  rightAction?: React.ReactNode;
}

export function PageHeader({ title, subtitle, showBack, backTo, rightAction }: PageHeaderProps) {
  const navigate = useNavigate();

  return (
    <header className="sticky top-0 z-10 bg-background/80 backdrop-blur-md border-b border-border/50 px-4 py-3">
      <div className="flex items-center gap-3 max-w-lg mx-auto">
        {showBack && (
          <Button
            variant="ghost"
            size="icon"
            onClick={() => (backTo ? navigate(backTo) : navigate(-1))}
            className="shrink-0"
          >
            <ArrowLeft className="h-5 w-5" />
          </Button>
        )}
        <div className="flex-1 min-w-0">
          <h1 className="text-lg font-semibold truncate">{title}</h1>
          {subtitle && (
            <p className="text-sm text-muted-foreground truncate">{subtitle}</p>
          )}
        </div>
        {rightAction && <div className="shrink-0">{rightAction}</div>}
      </div>
    </header>
  );
}
