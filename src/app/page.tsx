import { AppHeader } from "@/components/hoax-guard/Header";
import { AnalysisForm } from "@/components/hoax-guard/AnalysisForm";
import Link from 'next/link';

export default function Home() {
  return (
    <main className="container mx-auto px-4 py-8">
      <AppHeader />
      <AnalysisForm />
      <footer className="text-center mt-12 text-sm text-foreground/60">
        <p>
            Learn more about our mission on the <Link href="/about" className="text-primary hover:underline">About Page</Link>.
        </p>
        <p>Built with Next.js, Genkit, and ShadCN UI.</p>
      </footer>
    </main>
  );
}
