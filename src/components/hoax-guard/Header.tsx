import { ShieldCheck } from 'lucide-react';

export function AppHeader() {
  return (
    <header className="text-center p-8 bg-primary/10 rounded-xl mb-8">
      <div className="flex items-center justify-center gap-4 mb-4">
        <ShieldCheck className="w-12 h-12 text-primary" />
        <h1 className="text-5xl font-bold text-primary">HoaxGuard</h1>
      </div>
      <p className="max-w-3xl mx-auto text-foreground/80">
        Your AI-powered assistant to detect misinformation. Analyze text and images, get detailed rationales, and chat with our fact-checker.
      </p>
    </header>
  );
}
