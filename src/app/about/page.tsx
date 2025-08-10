import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { ArrowLeft, ShieldCheck } from "lucide-react";

export default function AboutPage() {
  return (
    <div className="min-h-screen flex items-center justify-center p-4 bg-background">
      <Card className="max-w-3xl w-full shadow-2xl">
        <CardHeader className="text-center">
          <div className="flex items-center justify-center gap-4 mb-4">
            <ShieldCheck className="w-12 h-12 text-primary" />
            <CardTitle className="text-4xl font-bold text-primary">About HoaxGuard</CardTitle>
          </div>
        </CardHeader>
        <CardContent className="space-y-6 text-lg text-foreground/80 leading-relaxed">
          <p>
            In today's digital age, misinformation spreads like wildfire. It can influence opinions, affect decisions, and create division. <strong>HoaxGuard</strong> was born from a need to empower individuals with the tools to critically evaluate the information they consume online.
          </p>
          <p>
            Our mission is to provide a simple, accessible, and powerful platform that leverages cutting-edge Artificial Intelligence to analyze content for potential signs of being a hoax or misinformation. By providing a detailed rationale and citing credible sources, we aim not just to give an answer, but to foster media literacy and critical thinking skills.
          </p>
          <p>
            Whether it's a suspicious news article, a viral social media post, or a questionable image, HoaxGuard is your first line of defense in the fight for a more informed public.
          </p>
          <div className="text-center pt-6">
            <Button asChild>
              <Link href="/">
                <ArrowLeft className="mr-2 h-4 w-4" />
                Back to Analysis
              </Link>
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
