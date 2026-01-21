import { Button } from '@/components/ui/button';
import { Link, useLocation } from 'react-router-dom';
import { Zap, LayoutGrid, LogIn } from 'lucide-react';

export function Header() {
  const location = useLocation();

  return (
    <header className="sticky top-0 z-50 w-full border-b border-border/50 glass-card">
      <div className="container mx-auto px-4 h-16 flex items-center justify-between">
        {/* Logo */}
        <Link to="/" className="flex items-center gap-2 group">
          <div className="relative">
            <Zap className="w-8 h-8 text-primary transition-transform group-hover:scale-110" />
            <div className="absolute inset-0 blur-lg bg-primary/30 animate-pulse-glow" />
          </div>
          <span className="font-heading text-xl font-bold">
            <span className="gradient-text">Hack</span>Spaces
          </span>
        </Link>

        {/* Navigation */}
        <nav className="flex items-center gap-2">
          <Link to="/">
            <Button 
              variant={location.pathname === '/' ? 'glow' : 'ghost'} 
              size="sm"
              className="gap-2"
            >
              <LayoutGrid className="w-4 h-4" />
              Spaces
            </Button>
          </Link>
          <Link to="/auth">
            <Button 
              variant={location.pathname === '/auth' ? 'glow' : 'glass'} 
              size="sm"
              className="gap-2"
            >
              <LogIn className="w-4 h-4" />
              Login
            </Button>
          </Link>
        </nav>
      </div>
    </header>
  );
}
